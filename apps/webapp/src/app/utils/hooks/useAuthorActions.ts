import { useNavigate } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths, BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useAuthorActions = () => {
  const navigate = useNavigate();
  const alerts = useAlerts();
  const api = useApi();

  const getAuthorPageUrlWithoutId = (): string => {
    return `${BaseRoutePaths.AUTHOR}`;
  }

  const getAuthorPageUrl = (id: number): string => {
    return `${BaseRoutePaths.AUTHOR}/${id}`;
  }

  const getAdminAuthorPageUrlWithoutId = (): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}`;
  }

  const getAdminAuthorPageUrl = (id: number): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/${id}`;
  }

  const navigateToAuthorPage = (id: number): void => {
    navigate(getAuthorPageUrl(id));
  }

  const navigateToAdminAuthorPage = (id: number): void => {
    navigate(getAdminAuthorPageUrl(id));
  }

  const navigateToAdminAuthorsPage = (): void => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`);
  }

  const navigateToEditForm = (id: number): void => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/${id}`);
  }

  const deleteAuthor = (id: number, successFallback: () => void) => {
    api.deleteAuthor(id)
      .then(successFallback)
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    getAuthorPageUrlWithoutId,
    getAuthorPageUrl,
    getAdminAuthorPageUrlWithoutId,
    getAdminAuthorPageUrl,
    navigateToAuthorPage,
    navigateToAdminAuthorPage,
    navigateToAdminAuthorsPage,
    navigateToEditForm,
    deleteAuthor
  }
}
