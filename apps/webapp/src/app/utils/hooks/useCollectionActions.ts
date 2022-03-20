import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useCollectionActions = () => {
  const history = useHistory();
  const alerts = useAlerts();
  const api = useApi();

  const navigateToCollectionPage = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}/${id}`);
  }

  const navigateToCollectionsPage = () => {
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
    navigateToCollectionPage,
    navigateToCollectionsPage,
    navigateToAddForm,
    navigateToEditForm,
    deleteCollection
  }
}
