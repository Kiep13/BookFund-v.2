import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ARTICLES_FOLDERS_MOCK } from '@mocks/articlesFoldersMock';
import { BaseRoutePaths } from '@utils/enums';
import { IArticleFolder } from '@utils/interfaces';

export const useArticles = () => {
  const history = useHistory();

  const [folders, setFolders] = useState<IArticleFolder[]>(ARTICLES_FOLDERS_MOCK);

  const handleFolderNewClick = (): void => {
    history.push(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_NEW}`);
  }

  return {
    folders,
    handleFolderNewClick
  }
}
