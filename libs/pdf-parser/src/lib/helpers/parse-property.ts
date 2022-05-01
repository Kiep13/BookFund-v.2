const ARRAY_SEPARATOR_REG_EXP = new RegExp('\\s|\\/');
const LONG_WHITESPACES_REG_EXP = new RegExp('\\s{2,}', 'g');

const PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP = new RegExp('\\/([\\w\\n*]*)\\s?\\[([(\\s\\w\\d\\-\\+\\<\\>\\/\\.)]*)\\](\\s?)', 'g');
const PROPERTY_WITH_ROUND_BRACKETS_REG_EXP = new RegExp('\\/([(\\w\\n*)]*)(\\s?)(\\(\\s?)([\\s\\S]*?)(\\s?\\)+)(\\s?)', 'g');
const SPECIFIC_PROPERTY_REG_EXP = new RegExp('\\/?(Type|Name|Filter|Tabs|FontName|Encoding|BaseFont|SMask|BM)(\\s?)\\/([(\\w\\+)]*)[\\/\\}]', 'g');
const INNER_OPEN_REG_EXP = new RegExp('\\/([(\\w)]*)(\\s?)\\{', 'g');
const USUAL_PROPERTY_REGEXP = new RegExp('\\/?\\/([\\s\\w\\+\\-\\.]*)[\\/\\,\\}\\"]', 'g');

const idDecodedProperty = (propertyName: string): boolean => {
  return  propertyName === 'O' || propertyName === 'U' || propertyName === 'Creator'
          || propertyName === 'Producer' || propertyName == 'LastModified' || propertyName == 'URI';
}

const cleanUpFromLongWhitespaces = (givenString: string): string => {
  let resultString = givenString;

  const matchResult = givenString.match(LONG_WHITESPACES_REG_EXP);

  if(matchResult) {
    for(let index = 0; index < matchResult.length; index++) {
      const searchWhitespaces = matchResult[index];

      resultString = resultString.replaceAll(searchWhitespaces, '');
    }
  }

  return resultString;
}

const changeAllRoundBrackets = (givenString: string): string => {
  let resultString = givenString;

  const matchResult = givenString.match(PROPERTY_WITH_ROUND_BRACKETS_REG_EXP);

  if(matchResult) {
    for(let index = 0; index < matchResult.length; index++) {
      const updatedMatch = matchResult[index].match('\\/([(\\w\\n*)]*)(\\s?)(\\(\\s?)([\\s\\S]*?)(\\s?\\)+)(\\s?)');

      const property = matchResult[index];
      const propertyName = updatedMatch[1];
      const propertyValue = idDecodedProperty(propertyName) ? Buffer.from(updatedMatch[4]).toString('hex') : updatedMatch[4];

      resultString = resultString.replace(property, `"${propertyName}": "${propertyValue}",`);
    }
  }

  return resultString;
}

const changeAllSquareBrackets = (givenString: string): string => {
  let resultString = givenString;

  const matchResult = givenString.match(PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP);

  if(matchResult) {
    for(let index = 0; index < matchResult.length; index++) {
      const updatedMatch = matchResult[index].match('\\/([(\\S*)\\/]*)\\s?\\[([(\\s\\w\\d\\-\\+\\<\\>\\/\\.)]*)\\](\\s?)');

      const property = matchResult[index];
      const propertyName = updatedMatch[1];
      const propertyValue = updatedMatch[2].toString().split(ARRAY_SEPARATOR_REG_EXP).filter((item) => item !== '');

      resultString = resultString.replace(property, `"${propertyName}": [${propertyValue.map((item) => `"${item}"`).join(', ')}],`);
    }
  }

  return resultString;
}

const changeAllSpecificProperties = (givenString: string): string => {
  let resultString = givenString;

  const matchResult = givenString.match(SPECIFIC_PROPERTY_REG_EXP);

  if(matchResult) {
    for(let index = 0; index < matchResult.length; index++) {
      const updatedMatch = matchResult[index].match('\\/?(Type|Name|Filter|Tabs|FontName|Encoding|BaseFont|SMask|BM)(\\s?)\\/([(\\w\\+)]*)[\\/\\}]');

      const property = matchResult[index];
      const propertyName = updatedMatch[1];
      const propertyValue = updatedMatch[3];

      resultString = resultString.replace(property.slice(0, -1), `"${propertyName}": "${propertyValue}",`);
    }
  }

  return resultString;
}

const changeAllOpenInnerObjectPropertyName = (givenString: string): string => {
  let resultString = givenString;

  const matchResult = givenString.match(INNER_OPEN_REG_EXP);

  if(matchResult) {
    for(let index = 0; index < matchResult.length; index++) {
      const updatedMatch = matchResult[index].match('\\/([(\\w)]*)(\\s?)\\{');

      const propertyName = updatedMatch[1];

      resultString = resultString.replace(`${updatedMatch[0]}`, `,"${propertyName}":{`);
    }
  }

  return resultString;
}

const changeAllSimpleProperties = (givenString: string): string => {
  let resultString = givenString;

  const matchResult = givenString.match(USUAL_PROPERTY_REGEXP);

  if(matchResult) {
    for(let index = 0; index < matchResult.length; index++) {
      const updatedMatch = matchResult[index].match('\\/?\\/([\\s\\w\\+\\-\\.]*)[\\/\\,\\}\\"]');

      const oldProperty = updatedMatch[1];

      const oldPropertyArray = oldProperty.split(' ');
      const propertyName = oldPropertyArray[0] || oldProperty;
      const propertyValueArray = oldPropertyArray.slice(1)?.length ? oldPropertyArray.slice(1).map(item => `"${item}"`) : [true];
      const propertyValue = propertyValueArray.length === 1 ? propertyValueArray[0] : `[${propertyValueArray.join(', ')}]`;

      resultString = resultString.replace(`${updatedMatch[0]}`, `,"${propertyName}": ${propertyValue}${
          updatedMatch[0].endsWith('}') ? '}' :
            updatedMatch[0].endsWith('"') ? ',"' : ','
        }`
      );
    }
  }

  return resultString;
}

const decodeParts = (object: any): any => {
  Object.entries(object).forEach(([key, value]) => {
    if(idDecodedProperty(key)) {
      object[key] = Buffer.from(value.toString(), 'hex').toString();
    } else if( typeof value === 'object' && !Array.isArray(value)) {
      object[key] = decodeParts(value);
    }
  })

  return object;
}

export const parseProperties = (givenString: string) => {
  givenString = givenString.replaceAll('<<', '{');
  givenString = givenString.replaceAll('>>', '},');
  givenString = givenString.replaceAll('\n', '');
  givenString = givenString.replaceAll('\r', '');

  givenString = cleanUpFromLongWhitespaces(givenString);

  givenString = givenString.replaceAll('},}', '}}');
  givenString = givenString.slice(0, givenString.length - 1);

  const stringWithRoundBrackets = changeAllRoundBrackets(givenString);
  const stringWithSquareBrackets = changeAllSquareBrackets(stringWithRoundBrackets);
  const stringWithSpecificProperties = changeAllSpecificProperties(stringWithSquareBrackets)
    .replaceAll('/"', '"');

  const stringWithOpenObjects = changeAllOpenInnerObjectPropertyName(stringWithSpecificProperties)
    .replaceAll(',,', ',')
    .replaceAll('{/,', '{')
    .replaceAll('/', '//');

  const stringWithSimpleProperties = changeAllSimpleProperties(stringWithOpenObjects)
    .replaceAll('/', '')
    .replaceAll(' ', '')
    .replaceAll('{,', '{')
    .replaceAll(',}', '}')
    .replaceAll(',,', ',');

  const result = stringWithSimpleProperties.endsWith(',') ? stringWithSimpleProperties.slice(0, -1) : stringWithSimpleProperties;

  return decodeParts(JSON.parse(result.toString()));
}
