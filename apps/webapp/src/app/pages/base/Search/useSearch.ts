import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { ISearchOptions, ISearchResults } from '@utils/interfaces';

import { DEFAULT_SEARCH_OPTIONS } from './constants';
import { ISearchPageParams } from './interfaces';

export const useSearch = () => {
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [searchTerm, setSearchTerm] = useState<string>((params as ISearchPageParams).searchTerm || '');
  const [searchResults, setSearchResults] = useState<ISearchResults>();

  const history = useHistory();

  const {search} = useApi();
  const {addError} = useAlerts();

  const handleSearchTermChange = (newSearchTerm): void => {
    setSearchTerm(newSearchTerm);
    history.replace(`${BaseRoutePaths.SEARCH}/${newSearchTerm}`);
  }

  const loadSearchResult = (): void => {
    setPageState(CardStates.LOADING);
    const searchOptions: ISearchOptions = {
      ...DEFAULT_SEARCH_OPTIONS,
      searchTerm
    }

    search(searchOptions)
      .then((response: ISearchResults) => {
        setSearchResults(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        setPageState(CardStates.ERROR);
        addError(API_TOOLTIP_ERROR);
      })
  }

  const navigateBack = (): void => {
    history.goBack();
  }

  return {
    pageState,
    searchResults,
    searchTerm,
    loadSearchResult,
    handleSearchTermChange,
    navigateBack
  }
}
