import { PROPERTY_WITH_IDS_REG_EXP } from '../constants';
import { ObjectProperties } from '../enums';

const isUntransformedProperty = (propertyName): boolean => {
  return propertyName === ObjectProperties.PARENT ||
    propertyName === ObjectProperties.MEDIABOX ||
    propertyName === ObjectProperties.STRUCT_TREE_ROOT ||
    propertyName === ObjectProperties.PREV ||
    propertyName === ObjectProperties.NEXT
}

export const buildNodeTree = (node: any, objects: any) => {
  if (!node) {
    return;
  }

  Object.entries(node).forEach(([key, value]) => {
    if (!isUntransformedProperty(key) && Array.isArray(value) && value['join'](' ').match(PROPERTY_WITH_IDS_REG_EXP)) {
      node[key] = node[key]?.map((value) => +value).filter(Boolean).map((objectId) => {
        const object = objects.find((object) => +object.objectId === +objectId);

        buildNodeTree(object, objects);

        return object;
      });
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      node[key] = buildNodeTree(value, objects);
    }
  })

  return node;
}
