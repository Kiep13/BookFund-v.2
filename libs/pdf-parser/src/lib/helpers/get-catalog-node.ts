import { ObjectTypes } from '../enums';

export const getCatalogNode = (objects: any[]) => {
  return objects.find((object) => object.Type && object.Type === ObjectTypes.CATALOG);
}
