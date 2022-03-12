import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { useAlerts } from '@features/alertsBlock';
import { useApi } from '@shared/hooks';

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
