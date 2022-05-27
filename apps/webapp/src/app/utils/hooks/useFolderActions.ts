import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useFolderActions = () => {
  const history = useHistory();
  const {addError} = useAlerts();
  const {deleteFolder} = useApi();

  const navigateToFoldersBooksPage = (): void => {
    history.push(`${BaseRoutePaths.ARTICLES}`);
  }

  const navigateToEditForm = (id: number): void => {
    history.push(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_EDIT}/${id}`);
  }

  const handleDeleteFolder = (id: number, successFallback: () => void) => {
    deleteFolder(id)
      .then(successFallback)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    navigateToFoldersBooksPage,
    navigateToEditForm,
    handleDeleteFolder
  }
}
