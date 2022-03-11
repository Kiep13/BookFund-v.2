import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { useAlerts } from '@features/alertsBlock';
import { useApi } from '@shared/hooks/useApi';

export const useAuthorActions = () => {
  const history = useHistory();
  const alerts = useAlerts();
  const api = useApi();

  const navigateToAuthorPage = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/${id}`);
  }

  const navigateToAuthorsPage = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`);
  }

  const navigateToEditForm = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/${id}`);
  }

  const deleteAuthor = (id: number, successFallback: () => void) => {
    api.deleteAuthor(id)
      .then(successFallback)
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    navigateToAuthorPage,
    navigateToAuthorsPage,
    navigateToEditForm,
    deleteAuthor
  }
}
