import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useArticleActions = () => {
  const history = useHistory();
  const {deleteArticle} = useApi();
  const {addError} = useAlerts();

  const navigateToEditForm = (id: number): void => {
    history.push(`${BaseRoutePaths.ARTICLE_EDIT}/${id}`);
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
