import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IAuthor, IFormPageParams } from '@utils/interfaces';

export const useAuthorLoad = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [author, setAuthor] = useState<IAuthor>();

  const params = useParams();

  const {getAuthor} = useApi();
  const {addError} = useAlerts();

  const loadAuthor = (): void => {
    const authorId = (params as IFormPageParams).id;

    getAuthor(authorId)
      .then((response: IAuthor) => {
        setAuthor(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  };

  return {
    author,
    pageState,
    loadAuthor
  };
};
