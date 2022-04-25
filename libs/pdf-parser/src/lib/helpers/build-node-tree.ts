import { PROPERTY_WITH_IDS_REG_EXP } from '../constants';
import { ObjectProperties } from '../enums';

export const buildNodeTree = (node: any, objects: any) => {
  if (!node) {
    return;
  }

  Object.entries(node).forEach(([key, value]) => {
    if (key !== ObjectProperties.PARENT && key !== ObjectProperties.MEDIABOX && key !== ObjectProperties.STRUCT_TREE_ROOT
      && Array.isArray(value) && value['join'](' ').match(PROPERTY_WITH_IDS_REG_EXP)) {
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
