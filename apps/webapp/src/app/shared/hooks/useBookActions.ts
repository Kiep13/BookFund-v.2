import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { useAlerts } from '@features/alertsBlock';
import { useConfirmationPopup } from '@features/confirmationPopup';
import { useApi } from '@shared/hooks';

export const useBookActions = () => {
  const history = useHistory();
  const alerts = useAlerts();
  const api = useApi();
  const confirmationPopup = useConfirmationPopup();

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
    const handleConfirmation = () => {
      api.deleteBook(id)
        .then(successFallback)
        .catch(() => {
          alerts.addError(API_TOOLTIP_ERROR);
        });
    }

    confirmationPopup.openPopup({
      title: 'Delete book',
      text: 'Are you sure that you want delete this book?',
      confirmationButtonLabel: 'Delete'
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
