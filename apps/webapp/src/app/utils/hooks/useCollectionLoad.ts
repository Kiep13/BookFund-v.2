import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { ICollection, IFormPageParams } from '@utils/interfaces';

export const useCollectionLoad = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [collection, setCollection] = useState<ICollection>();

  const params = useParams<IFormPageParams>();

  const { addError } = useAlerts();
  const { getCollection } = useApi();

  const loadCollection = useCallback(() => {
    const collectionId = params.id;

    collectionId && getCollection(collectionId)
      .then((response: ICollection) => {
        setCollection(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }, []);

  useEffect(() => {
    loadCollection();
  }, []);

  return {
    collection,
    pageState
  }
}
