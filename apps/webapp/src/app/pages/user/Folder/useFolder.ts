import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import { ADD_CARD_ACTION, API_TOOLTIP_ERROR, DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { BaseRoutePaths, CardActions, CardStates } from '@utils/enums';
import { IArticleFolder, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useFolderActions } from '@utils/hooks';

import { SUCCESSFULLY_DELETED_FOLDER } from './constants';

export const useFolder = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [folder, setFolder] = useState<IArticleFolder>();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
  const history = useHistory();
  const params = useParams();

  const {getFolder} = useApi();
  const {addSuccess, addError} = useAlerts();
  const {navigateToEditForm, handleDeleteFolder} = useFolderActions();

  const simpleActions = [ADD_CARD_ACTION];
  const expandedActions = [ADD_CARD_ACTION, EDIT_CARD_ACTION, DELETE_CARD_ACTION];

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
    addSuccess(SUCCESSFULLY_DELETED_FOLDER);
  }

  const handleDeleteConfirm = (): void => {
    if(!folder) return;

    handleDeleteFolder(folder.id, handleDeleteSuccess);
    setIsDeleteModalOpened(false);
  }

  const navigateToNewArticleForm = (): void => {
    history.push(`${BaseRoutePaths.ARTICLE_NEW}`, {
      defaultFolder: folder,
    });
  }

  const handleHeaderIconClick = (actionType: CardActions): void => {
    switch(actionType) {
      case CardActions.DELETE: openModal(); break;
      case CardActions.EDIT: navigateToEditPage(); break;
      case CardActions.ADD: navigateToNewArticleForm(); break;
    }
  }

  const handleModalClose = (): void => {
    setIsDeleteModalOpened(false);
  }

  return {
    pageState,
    folder,
    simpleActions,
    expandedActions,
    isDeleteModalOpened,
    initPage,
    navigateBack,
    handleHeaderIconClick,
    handleDeleteConfirm,
    handleModalClose,
  }
}
