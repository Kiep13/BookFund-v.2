import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { useAlerts } from '@features/alertsBlock';
import { useApi } from '@shared/hooks';

export const useBookActions = () => {
  const history = useHistory();
  const alerts = useAlerts();
  const api = useApi();

  const navigateToBookPage = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/${id}`);
  }

  const navigateToBooksPage = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`);
  }

  const navigateToEditForm = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/${id}`);
  }

  const deleteBook = (id: number, successFallback: () => void) => {
    api.deleteBook(id)
      .then(successFallback)
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    navigateToBookPage,
    navigateToBooksPage,
    navigateToEditForm,
    deleteBook
  }
}
