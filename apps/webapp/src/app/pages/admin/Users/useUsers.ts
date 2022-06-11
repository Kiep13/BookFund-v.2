import { debounce } from 'lodash';
import { SyntheticEvent, useCallback, useState } from 'react';

import { CardStates, DodecagonPageSizes } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { API_TOOLTIP_ERROR, } from '@utils/constants';
import { IListApiView, ISearchOptions, IUser } from '@utils/interfaces';

import { DELAY } from './constants';

export const useUsers = () => {
  const [state, setState] = useState<CardStates>(CardStates.LOADING);
  const [data, setData] = useState<IUser[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(DodecagonPageSizes.Twelve);

  const {getUsers} = useApi();
  const {addError} = useAlerts();

  const rowsPerPageOptions = Object.values(DodecagonPageSizes).map(value => +value).filter((value) => value);

  const loadUsers = useCallback(
    debounce(async (search) => {
      setState(CardStates.LOADING);

      const searchOptions: ISearchOptions = {
        pageSize: rowsPerPage,
        page: page,
        searchTerm: search
      }

      getUsers(searchOptions)
        .then((response: IListApiView<IUser>) => {
          setData(response.data);
          setCount(response.count);

          setState(response.data.length > 0 ? CardStates.CONTENT : CardStates.NO_CONTENT);
        })
        .catch(() => {
          setState(CardStates.ERROR);
          addError(API_TOOLTIP_ERROR);
        });

    }, DELAY),
    [rowsPerPage, page]
  )

  const handleRowsPerPageChanged = (event: any): void => {
    setState(CardStates.LOADING);
    const newRowsPerPage = parseInt(event.target.value, 10);

    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setState(CardStates.LOADING);
    setPage(newPage);
  };

  const handleTyping = (event: SyntheticEvent): void => {
    setState(CardStates.LOADING);
    const { value } = event.target as HTMLTextAreaElement;
    setSearchTerm(value);
  }

  return {
    state,
    data,
    count,
    searchTerm,
    rowsPerPage,
    page,
    rowsPerPageOptions,
    loadUsers,
    handleTyping,
    handlePageChange,
    handleRowsPerPageChanged,
  }
}
