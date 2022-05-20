import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ARTICLES_FOLDERS_MOCK } from '@mocks/articlesFoldersMock';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardActions, CardStates } from '@utils/enums';
import { IArticleFolder, IListApiView } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { SUCCESSFULLY_DELETED } from './constants';

export const useArticles = () => {
  const history = useHistory();
  const {getFolders, deleteFolder} = useApi();
  const {addSuccess, addError} = useAlerts();

  const [folders, setFolders] = useState<IArticleFolder[]>(ARTICLES_FOLDERS_MOCK);
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [selectedId, setSelectedId] = useState<number>();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const initFolders = async () => {
    getFolders()
      .then((response: IListApiView<IArticleFolder>) => {
        setFolders(response.data);

        if (response.count) {
          setPageState(CardStates.CONTENT);
          return;
        }

        setPageState(CardStates.NO_CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  const navigateToNewArticleForm = (): void => {
    history.push(`${BaseRoutePaths.ARTICLE_NEW}`);
  }

  const navigateToNewFolderForm = (): void => {
    history.push(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_NEW}`);
  }

  const navigateToEditFolderForm = (id: number): void => {
    history.push(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_EDIT}/${id}`);
  }

  const handleFolderActionClick = (id: number, actionType: CardActions): void => {
    setSelectedId(id);

    switch(actionType) {
      case CardActions.DELETE: setIsDeleteModalOpened(true); break;
      case CardActions.EDIT: navigateToEditFolderForm(id); break;
    }
  }

  const handleDeleteConfirm = (): void => {
    if(!selectedId) return;

    setIsDeleteModalOpened(false);
    deleteFolder(selectedId)
      .then(() => {
        initFolders();
        addSuccess(SUCCESSFULLY_DELETED);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  const handleModalClose = (): void => {
    setIsDeleteModalOpened(false);
  }

  return {
    folders,
    pageState,
    isDeleteModalOpened,
    initFolders,
    navigateToNewArticleForm,
    navigateToNewFolderForm,
    handleFolderActionClick,
    handleDeleteConfirm,
    handleModalClose
  }
}
