import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ARTICLES_FOLDERS_MOCK } from '@mocks/articlesFoldersMock';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
import { IArticleFolder, IListApiView } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

export const useArticles = () => {
  const history = useHistory();
  const {getFolders} = useApi();
  const {addError} = useAlerts();

  const [folders, setFolders] = useState<IArticleFolder[]>(ARTICLES_FOLDERS_MOCK);
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);

  const initFolders = async () => {
    getFolders()
      .then((response: IListApiView<IArticleFolder>) => {
        setFolders(response.data);

        if(response.count) {
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

  const handleFolderNewClick = (): void => {
    history.push(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_NEW}`);
  }

  return {
    folders,
    pageState,
    initFolders,
    handleFolderNewClick
  }
}
