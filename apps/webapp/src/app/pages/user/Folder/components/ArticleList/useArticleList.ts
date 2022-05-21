import { debounce } from 'lodash';
import { SyntheticEvent, useCallback, useState } from 'react';

import { API_TOOLTIP_ERROR, DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { CardStates, DodecagonPageSizes } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IArticle, ICardAction, IListApiView, ISearchOptions } from '@utils/interfaces';

import { DELAY } from '../../constants';

export const useArticleList = (folderId: number) => {
  const [state, setState] = useState<CardStates>(CardStates.LOADING);
  const [data, setData] = useState<IArticle[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(DodecagonPageSizes.Twelve);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();

  const {getArticles} = useApi();
  const {addError, addSuccess} = useAlerts();

  const rowsPerPageOptions = Object.values(DodecagonPageSizes).map(value => +value).filter((value) => value);
  const cardActions: ICardAction[] = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const handleTyping = (event: SyntheticEvent): void => {
    const { value } = event.target as HTMLTextAreaElement;
    setSearchTerm(value);
  }

  const loadCollections = useCallback(
    debounce(async (search) => {
      setState(CardStates.LOADING);

      const searchOptions: ISearchOptions = {
        pageSize: rowsPerPage,
        page: page,
        searchTerm: search,
        keyId: folderId
      }

      getArticles(searchOptions)
        .then((response: IListApiView<IArticle>) => {
          setData(response.data);
          setCount(response.count);

          setState(response.data.length > 0 ? CardStates.CONTENT : CardStates.NO_CONTENT);
        })
        .catch(() => {
          setState(CardStates.ERROR);
          addError(API_TOOLTIP_ERROR);
        })

    }, DELAY),
    [rowsPerPage, page]
  )

  const handleRowsPerPageChanged = (event: any): void => {
    const newRowsPerPage = parseInt(event.target.value, 10);

    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  return {
    state,
    data,
    count,
    cardActions,
    searchTerm,
    rowsPerPage,
    page,
    isModalOpened,
    rowsPerPageOptions,
    loadCollections,
    handleTyping,
    handlePageChange,
    handleRowsPerPageChanged,
  }
}
