import { useNavigate } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useArticleActions = () => {
  const navigate = useNavigate();
  const {deleteArticle} = useApi();
  const {addError} = useAlerts();

  const navigateToEditForm = (id: number): void => {
    navigate(`${BaseRoutePaths.ARTICLE_EDIT}/${id}`);
  }

  const handleArticleDelete = (id: number, successCallback: () => void): void => {
    deleteArticle(id)
      .then(() => {
        successCallback();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
  }

  return {
    navigateToEditForm,
    handleArticleDelete,
  }
}
