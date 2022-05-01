import { inflateSync } from 'zlib';

import { PROPERTIES_REG_EXP, PDF_VERSION_REG_EXP } from '../constants';
import {FilterTypes} from '../enums';
import { buildNodeTree, getCatalogNode, parseProperties } from '../helpers';

export const parse = (buffer) => {
  let stringBufferContent = buffer.toString('binary');

  const pdfVersion = stringBufferContent.match(PDF_VERSION_REG_EXP)[1].toString();

  const objects = [];
  while(true) {
    const startPosition = stringBufferContent.search('\\d* 0 obj');

    if(startPosition === -1) {
      break;
    }

    const endPosition = stringBufferContent.indexOf('endobj', startPosition);

    let object = stringBufferContent.slice(startPosition, endPosition);
    stringBufferContent = stringBufferContent.slice(endPosition);

    const objectId = +object.slice(0, object.indexOf(' '));

    const positionOfBrackets = object.indexOf('<<');
    const startObjPosition = positionOfBrackets !== -1 ? positionOfBrackets : object.indexOf('[');

    objects.push({
      objectId,
      content: object.slice(startObjPosition)
    });
  }

  const objectsWithProperties = objects.map((object) => {

    if (object.content.indexOf('stream') !== -1) {
      const startStreamIndex = object.content.indexOf('stream');
      const endStreamIndex = object.content.indexOf('endstream');

      object.stream = object.content.slice(startStreamIndex + 6, endStreamIndex);

      while(true) {
        if(object.stream.startsWith('\r') || object.stream.startsWith('\n')) {
          object.stream = object.stream.slice(1);
        } else if (object.stream.endsWith('\r') || object.stream.endsWith('\n')) {
          object.stream = object.stream.slice(0, object.stream.length - 1);
        } else {
          break;
        }
      }

      object.content = object.content.slice(0, startStreamIndex);
    }

    if (!object.content.match(PROPERTIES_REG_EXP)?.length) {
      delete object.content;
      return object;
    }

    let propertiesString = object.content.match(PROPERTIES_REG_EXP)[0];

    try {
      const parsedProperties = parseProperties(propertiesString);

      object = {
        ...object,
        ...parsedProperties
      }

      delete object.content;

      if(object.stream && object?.Filter === FilterTypes.FLATE_DECODE) {
        const bufferStream = Buffer.from(object.stream, 'binary')
        object.stream = inflateSync(bufferStream).toString();
      }
    } catch (e) {
      console.log(object.objectId);
      console.log(e);
      throw Error;
    }

    return object;
  });

  const catalogNode = getCatalogNode(objectsWithProperties);

  const nodeTree = buildNodeTree(catalogNode, objectsWithProperties);

  const pdfInfo = {
    pdfVersion,
    // totalPagesCount: +nodeTree['Pages'][0].Count,
    nodeTree,
  }

  return pdfInfo;
}
