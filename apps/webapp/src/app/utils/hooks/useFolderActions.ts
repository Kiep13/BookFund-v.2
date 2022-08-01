import { useNavigate } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useFolderActions = () => {
  const navigate = useNavigate();
  const {addError} = useAlerts();
  const {deleteFolder} = useApi();

  const navigateToFoldersBooksPage = (): void => {
    navigate(`${BaseRoutePaths.ARTICLES}`);
  }

  const navigateToEditForm = (id: number): void => {
    navigate(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_EDIT}/${id}`);
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
