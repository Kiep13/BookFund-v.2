import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
import { IArticleFolder, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useFolderActions } from '@utils/hooks';

import { SUCCESSFULLY_DELETED } from './constants';

export const useFolder = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [folder, setFolder] = useState<IArticleFolder>();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
  const history = useHistory();
  const params = useParams();

  const {getFolder} = useApi();
  const {addSuccess, addError} = useAlerts();
  const {navigateToEditForm, handleDeleteFolder} = useFolderActions();

  const navigateBack = (): void => {
    history.goBack();
  }

  const navigateToEditPage = (): void => {
    folder && navigateToEditForm(folder.id);
  }

  const openModal = (): void => {
    setIsDeleteModalOpened(true);
  }

  const initPage = (): void => {
    const folderId = (params as IFormPageParams).id;

    getFolder(folderId)
      .then((response: IArticleFolder) => {
        setFolder(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

  const handleDeleteSuccess = (): void => {
    history.push(`${BaseRoutePaths.ARTICLES}`);
    addSuccess(SUCCESSFULLY_DELETED);
  }

  const handleDeleteConfirm = (): void => {
    if(!folder) return;

    handleDeleteFolder(folder.id, handleDeleteSuccess);
    setIsDeleteModalOpened(false);
  }

  const handleModalClose = (): void => {
    setIsDeleteModalOpened(false);
  }

  return {
    pageState,
    folder,
    isDeleteModalOpened,
    initPage,
    navigateBack,
    navigateToEditPage,
    openModal,
    handleDeleteConfirm,
    handleModalClose,
  }
}
