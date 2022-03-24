import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths, BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useCollectionActions = () => {
  const history = useHistory();
  const alerts = useAlerts();
  const api = useApi();

  const getCollectionPageUrlWithoutId = (): string => {
    return `${BaseRoutePaths.COLLECTION}`;
  }

  const getCollectionPageUrl = (id: number): string => {
    return `${BaseRoutePaths.COLLECTION}/${id}`;
  }

  const getAdminCollectionPageUrlWithoutId = (): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}`;
  }

  const getAdminCollectionPageUrl = (id: number): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}/${id}`;
  }

  const navigateToCollectionPage = (id: number): void => {
    history.push(getCollectionPageUrl(id));
  }

  const navigateToAdminCollectionPage = (id: number): void => {
    history.push(getAdminCollectionPageUrl(id));
  }

  const navigateToAdminCollectionsPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`);
  }

  const navigateToAddForm = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`);
  }

  const navigateToEditForm = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_EDIT}/${id}`);
  }

  const deleteCollection = (id: number, successFallback: () => void) => {
    api.deleteCollection(id)
      .then(successFallback)
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    getCollectionPageUrlWithoutId,
    getCollectionPageUrl,
    getAdminCollectionPageUrlWithoutId,
    getAdminCollectionPageUrl,
    navigateToCollectionPage,
    navigateToAdminCollectionPage,
    navigateToAdminCollectionsPage,
    navigateToAddForm,
    navigateToEditForm,
    deleteCollection
  }
}
