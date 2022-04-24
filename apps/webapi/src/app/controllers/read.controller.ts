import { Request, Response } from 'express';

import * as path from 'path';
import * as fs from 'fs/promises';
import { inflateSync } from 'zlib';

import { ResponseStatuses } from '@core/enums';

//HELPFUL
const OBJECT_REG_EXP = new RegExp('(\\d*\\s\\d*\\sobj\\r?\\n)([\\s\\S]*?)(\\r?\\nendobj)', 'g');
const PROPERTIES_REG_EXP = new RegExp('^<<\\/([(\\s\\S*)\\/]*)>>');
const STREAM_REG_EXP = new RegExp('(stream\\r?\\n)([\\s\\S]*?)(\\r?\\nendstream)');

const ARRAY_SEPARATOR_REG_EXP = new RegExp('\\s|\\/');

const PROPERTY_WITH_NESTED_PROPERTIES_REG_EXP = new RegExp('^\\/?([(\\w*)\\/]*)\\s?<<\\/([(\\s\\S*)\\/]*)>>');
const PROPERTY_WITH_ROUND_BRACKETS_REG_EXP = new RegExp('^\\/?([(\\w\\S*)\\/]*)(\\(\\s?)([\\s\\S]*?)(\\s?\\))(\\s?)');
const PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP = new RegExp('^\\/?([(\\S*)\\/]*)\\s?\\[([(\\s\\w\\d\\-\\+\\<\\>)]*)\\](\\s?)')
const SPECIFIC_PROPERTY_REG_EXP = new RegExp('^\\/?(Type|Name|Filter|Tabs|FontName|Encoding|BaseFont)\\/([(\\w\\+)]*)\\/');
const USUAL_PROPERTY_REGEXP = new RegExp('^\\/?([\\s\\w\\+\\-]*)\\/?');

const PROPERTY_WiTH_IDS_REG_EXP = new RegExp('(\\d+\\s0\\s\\w\\s?)+');

enum ObjectProperties {
  Type = 'Type',
  Lang = 'Lang',
  Pages = 'Pages',
  Parent = 'Parent',
  MediaBox = 'MediaBox',
  Filter = 'Filter'
}

enum FilterTypes {
  FlateDecode = 'FlateDecode',
  DCTDecode = 'DCTDecode'
}

const VERSION_ALGORITHMS = {
  '1.1': 'rc4',
  '1.2': 'rc4',
  '1.3': 'rc4',
  '1.4': 'rc4',
  '1.5': 'rc4',
  '1.6': 'aes-cbc',
  '1.7': 'aes-cbc',
}

const VERSION_DECRYPTION_LEY_LENGTH = {
  '1.1': 40,
  '1.2': 40,
  '1.3': 40,
  '1.4': 128,
  '1.5': 128,
  '1.6': 128,
  '1.7': 128,
}

enum ObjectTypes {
  Pages = 'Pages',
  Catalog = 'Catalog'
}


const parseProperty = (propertyString: string) => {

  if (propertyString.match(PROPERTY_WITH_NESTED_PROPERTIES_REG_EXP)?.length) {
    const propertyArray = propertyString.match(PROPERTY_WITH_NESTED_PROPERTIES_REG_EXP);

    const propertyName = propertyArray[1];

    let propertyValue = propertyArray[2];


    let openedIndex = propertyValue.indexOf('<<');

    if (openedIndex === -1) {
      if (propertyValue.includes('>>')) {
        propertyValue = propertyValue.slice(propertyValue.indexOf('>>'));
      }

      return {
        offset: propertyArray[0].length,
        result: {
          [propertyName]: {
            ...parseProperty(propertyValue).result
          }
        }
      }
    }

    let finalResult = {};
    while (propertyValue.length) {
      let closedIndex = propertyValue.indexOf('>>', openedIndex);

      if (closedIndex === -1) {
        break;
      }

      if (propertyValue.slice(openedIndex + 2, closedIndex).includes('<<')) {
        openedIndex = propertyValue.slice(openedIndex, closedIndex).indexOf('<<');
      } else if (openedIndex > closedIndex) {
        const {result} = parseProperty(propertyValue.slice(openedIndex, closedIndex));

        finalResult = {
          ...finalResult,
          result
        }

        propertyValue = propertyValue.slice(closedIndex + 3);
        openedIndex = 0;
      } else if (openedIndex === 0) {
        const {result} = parseProperty(propertyValue.slice(openedIndex, closedIndex));

        finalResult = {
          ...finalResult,
          ...result
        }

        propertyValue = propertyValue.slice(closedIndex + 3);
        openedIndex = 0;
      } else {
        const {result} = parseProperty(propertyValue.slice(openedIndex + 2, closedIndex));

        finalResult = {
          ...finalResult,
          [propertyValue.slice(0, openedIndex)]: result
        }

        propertyValue = propertyValue.slice(closedIndex + 3);
        openedIndex = 0;
      }
    }

    let offset = propertyArray[0].length;
    if (propertyArray[2].includes('>>')) {
      const lasIndex = propertyArray[0].lastIndexOf('>>');
      offset = propertyArray[0].slice(0, lasIndex).lastIndexOf('>>') + 2;
    }

    return {
      offset,
      result: {
        [propertyName]: {
          ...finalResult
        }
      }
    }
  }

  if (propertyString.match(PROPERTY_WITH_ROUND_BRACKETS_REG_EXP)?.length) {
    const propertyArray = propertyString.match(PROPERTY_WITH_ROUND_BRACKETS_REG_EXP);

    const propertyName = propertyArray[1];
    const propertyValue = propertyArray[3];

    return {
      offset: propertyArray[0].length,
      result: {
        [propertyName]: propertyValue
      }
    }
  }

  if (propertyString.match(PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP)?.length) {
    const propertyArray = propertyString.match(PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP);

    const propertyName = propertyArray[1];
    const propertyValue = propertyArray[2].split(ARRAY_SEPARATOR_REG_EXP).filter(Boolean);

    return {
      offset: propertyArray[0].length,
      result: {
        [propertyName]: propertyValue
      }
    }
  }

  if (propertyString.match(SPECIFIC_PROPERTY_REG_EXP)?.length) {
    const propertyArray = propertyString.match(SPECIFIC_PROPERTY_REG_EXP);

    const propertyName = propertyArray[1];
    const propertyValue = propertyArray[2];

    return {
      offset: propertyArray[0].length - 1,
      result: {
        [propertyName]: propertyValue
      }
    }
  }

  const propertyMatch = propertyString.match(USUAL_PROPERTY_REGEXP);
  const propertyArray = propertyMatch[1].split(' ');

  const propertyName = propertyArray[0] || propertyString;
  const propertyValue = propertyArray.slice(1)?.length ? propertyArray.slice(1) : [true];

  return {
    offset: propertyMatch[0].length,
    result: {
      [propertyName]: propertyValue.length === 1 ? propertyValue[0] : propertyValue
    }
  }
}

const getCatalogNode = (objects: any[]) => {
  return objects.find((object) => object.Type && object.Type === ObjectTypes.Catalog);
}

const buildNodeTree = (catalogNode: any, objects: any) => {
  const getChildNodes = (node) => {
    if(!node) {
      return;
    }

    const goThrowObject = (node) => {
      Object.entries(node).forEach(([key, value]) => {
        if(key !== ObjectProperties.Parent && key !== ObjectProperties.MediaBox
          && Array.isArray(value) && value['join'](' ').match(PROPERTY_WiTH_IDS_REG_EXP)) {
          node[key]= node[key]?.map((value) => +value).filter(Boolean).map((objectId) => {
            console.log(objectId);

            const object = objects.find((object) => +object.objectId === +objectId);

            getChildNodes(object);

            return object;
          });
        }

        if(typeof value === 'object' && !Array.isArray(value) && value !== null) {
          node[key] = goThrowObject(value);
        }
      })

      return node;
    }

    goThrowObject(node);

    return node;
  }

  catalogNode = getChildNodes(catalogNode);

  return catalogNode;
}

class ReadController {
  public async getPages(request: Request, response: Response, next: Function): Response {
    try {

      ///////SPECIAL VALERA CODE BLOCK
      // const usefull_buffer = await fs.readFile(`${path.resolve(__dirname, 'assets\\books\\usefull_info.pdf')}`);
      // var inflated = inflateSync(usefull_buffer);
      // console.log(inflated)
      // console.log(inflated.toString());
      //////ENDBLOCK

      // -----READ FILE-----
      const buffer = await fs.readFile(`${path.resolve(__dirname, 'assets\\books\\test.pdf')}`);
      const stringBufferContent = buffer.toString('binary');

      // -----GET MAIN INFO-----
      const pdfVersion = stringBufferContent.match('PDF-(\\d.?\\d)')[1];
      const totalPagesCount = +stringBufferContent.match('Count\\s(\\d)')[1];

      // -----GET PDF OBJECTS-----
      const objects = stringBufferContent.match(OBJECT_REG_EXP).map((object) => {
        const matches = object.match('(\\d*\\s\\d*\\sobj\\r?\\n)([\\s\\S]*?)(\\r?\\nendobj)');

        const objectId = matches[1].split(' ')[0];
        const content = matches[2];

        return {
          objectId,
          content,
        }
      });

      // -----GET PROPERTIES OF EACH OBJECT-----
      const objectsWithProperties = objects.map((object) => {

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

        if(object['stream'] && object['Filter'] && object['Filter'] === FilterTypes.FlateDecode) {
          const bufferStream = Buffer.from(object['stream'], 'binary')
          object['stream'] = inflateSync(bufferStream).toString();
        }

        return object;
      });

      const catalogNode = getCatalogNode(objectsWithProperties);

      const nodeTree = buildNodeTree(catalogNode, objectsWithProperties);


      // const streams = stringBufferContent.match(streamRegexp).slice(2,3).map((stream: string) => {
      //   return Buffer.from(stream.match('stream\\r?\\n([\\s\\S]*?)\\r?\\nendstream')[1], 'binary');
      // });
      //
      // const inflatedStreams = streams.map((stream) => {
      //   return inflateSync(stream).toString();
      // });

      const pdfInfo = {
        pdfVersion,
        totalPagesCount,
        nodeTree,
        // objectsWithProperties,
        // inflatedStreams
      }

      return response.status(ResponseStatuses.STATUS_OK).json(pdfInfo);
    } catch (error) {
      next(error)
    }
  }
}

export const readController = new ReadController();
