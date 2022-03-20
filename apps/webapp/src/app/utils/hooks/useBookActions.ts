import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useBookActions = () => {
  const history = useHistory();
  const alerts = useAlerts();
  const api = useApi();

  const getBookPageUrl = (id: number): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/${id}`;
  }

  const navigateToBookPage = (id: number): void => {
    history.push(getBookPageUrl(id));
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
    getBookPageUrl,
    navigateToBookPage,
    navigateToBooksPage,
    navigateToEditForm,
    deleteBook
  }
}
