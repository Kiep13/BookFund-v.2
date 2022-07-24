import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
 import { useAlerts, useApi, useBackNavigation } from '@utils/hooks';
import { ISearchOptions, ISearchResults } from '@utils/interfaces';

import { DEFAULT_SEARCH_OPTIONS } from './constants';
import { ISearchPageParams } from './interfaces';

export const useSearch = () => {
  const params = useParams<ISearchPageParams>();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [searchTerm, setSearchTerm] = useState<string>(params.searchTerm || '');
  const [searchResults, setSearchResults] = useState<ISearchResults>();

  const navigate = useNavigate();

  const {search} = useApi();
  const {addError} = useAlerts();
  const {navigatePreviousPage} = useBackNavigation(BaseRoutePaths.HOME);

  const handleSearchTermChange = (newSearchTerm): void => {
    setSearchTerm(newSearchTerm);
    navigate(`${BaseRoutePaths.SEARCH}/${newSearchTerm}`, {
      replace: true
    });
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

  const navigateBack = () => {
    navigatePreviousPage();
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
