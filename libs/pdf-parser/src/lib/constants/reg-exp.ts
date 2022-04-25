export const PDF_VERSION_REG_EXP = new RegExp('PDF-(\\d.?\\d)');

export const OBJECTS_REG_EXP = new RegExp('(\\d*\\s\\d*\\sobj\\r?\\n)([\\s\\S]*?)(\\r?\\nendobj)', 'g');
export const PROPERTIES_REG_EXP = new RegExp('^<<\\/([(\\s\\S*)\\/]*)>>');
export const STREAM_REG_EXP = new RegExp('(stream\\r?\\n)([\\s\\S]*?)(\\r?\\nendstream)');

export const ARRAY_SEPARATOR_REG_EXP = new RegExp('\\s|\\/');

export const PROPERTY_WITH_NESTED_PROPERTIES_REG_EXP = new RegExp('^\\/?([(\\w*)\\/]*)\\s?<<\\/([(\\s\\S*)\\/]*)>>');
export const PROPERTY_WITH_ROUND_BRACKETS_REG_EXP = new RegExp('^\\/?([(\\w\\S*)\\/]*)(\\(\\s?)([\\s\\S]*?)(\\s?\\))(\\s?)');
export const PROPERTY_WITH_SQUARE_BRACKETS_REG_EXP = new RegExp('^\\/?([(\\S*)\\/]*)\\s?\\[([(\\s\\w\\d\\-\\+\\<\\>)]*)\\](\\s?)')
export const SPECIFIC_PROPERTY_REG_EXP = new RegExp('^\\/?(Type|Name|Filter|Tabs|FontName|Encoding|BaseFont)\\/([(\\w\\+)]*)\\/');
export const USUAL_PROPERTY_REGEXP = new RegExp('^\\/?([\\s\\w\\+\\-]*)\\/?');

export const PROPERTY_WITH_IDS_REG_EXP = new RegExp('(\\d+\\s0\\s\\w\\s?)+');
