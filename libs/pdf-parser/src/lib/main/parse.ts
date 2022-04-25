import { inflateSync } from 'zlib';

import { OBJECTS_REG_EXP, STREAM_REG_EXP, PROPERTIES_REG_EXP, PDF_VERSION_REG_EXP } from '../constants';
import {FilterTypes} from '../enums';
import {buildNodeTree, getCatalogNode, parseProperty} from '../helpers';

export const parse = (buffer) => {
  const stringBufferContent = buffer.toString('binary');

  const pdfVersion = stringBufferContent.match(PDF_VERSION_REG_EXP)[1];

  const objectsWithProperties = stringBufferContent.match(OBJECTS_REG_EXP).map((object) => {
    const matches = object.match('(\\d*\\s\\d*\\sobj\\r?\\n)([\\s\\S]*?)(\\r?\\nendobj)');

    const objectId = matches[1].split(' ')[0];
    const content = matches[2];

    return {
      objectId,
      content,
    }
  }).map((object) => {

    if (object.content.match(STREAM_REG_EXP)) {
      object['stream'] = object.content.match(STREAM_REG_EXP)[2];
      const streamIndex = object.content.indexOf(object['stream']);
      object.content = object.content.slice(0, streamIndex);
    }

    if (!object.content.match(PROPERTIES_REG_EXP)?.length) {
      return object;
    }

    let propertiesString = `/${object.content.match(PROPERTIES_REG_EXP)[1]}`;

    while (propertiesString.length) {
      const {offset, result} = parseProperty(propertiesString);
      propertiesString = propertiesString.slice(offset);

      object = {
        ...object,
        ...result
      }
    }

    delete object.content;

    if(object['stream'] && object['Filter'] && object['Filter'] === FilterTypes.FLATE_DECODE) {
      const bufferStream = Buffer.from(object['stream'], 'binary')
      object['stream'] = inflateSync(bufferStream).toString();
    }

    return object;
  });

  const catalogNode = getCatalogNode(objectsWithProperties);

  const nodeTree = buildNodeTree(catalogNode, objectsWithProperties);

  const pdfInfo = {
    pdfVersion,
    totalPagesCount: +nodeTree['Pages'][0].Count,
    nodeTree
  }

  return pdfInfo;
}
