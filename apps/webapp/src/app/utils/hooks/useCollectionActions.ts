import { useNavigate } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths, BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useCollectionActions = () => {
  const navigate = useNavigate();
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
    navigate(getCollectionPageUrl(id));
  }

  const navigateToAdminCollectionPage = (id: number): void => {
    navigate(getAdminCollectionPageUrl(id));
  }

  const navigateToAdminCollectionsPage = () => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`);
  }

  const navigateToAddForm = (): void => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`);
  }

  const navigateToEditForm = (id: number): void => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_EDIT}/${id}`);
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
