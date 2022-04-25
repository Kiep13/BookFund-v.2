import {
  PROPERTY_WITH_NESTED_PROPERTIES_REG_EXP,
  PROPERTY_WITH_ROUND_BRACKETS_REG_EXP,
  PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP,
  SPECIFIC_PROPERTY_REG_EXP,
  USUAL_PROPERTY_REGEXP,
  ARRAY_SEPARATOR_REG_EXP
} from '../constants';

export const parseProperty = (propertyString: string) => {

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
