import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import { CardStates } from '@utils/enums';
import { useApi } from '@utils/hooks';
import { IArticle, IFormPageParams } from '@utils/interfaces';

export const useArticle = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [article, setArticle] = useState<IArticle>();
  const history = useHistory();
  const params = useParams();

  const {getArticle} = useApi();

  const initPage = (): void => {
    const articleId = (params as IFormPageParams).id;

    getArticle(articleId)
      .then((response) => {
        setArticle(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        setPageState(CardStates.ERROR);
      })
  }

  const createMarkup = () => {
    return {
      __html: article?.content || ''
    }
  }

  const navigateBack = (): void => {
    history.goBack();
  }

  return {
    article,
    pageState,
    initPage,
    navigateBack,
    createMarkup
  }
}
