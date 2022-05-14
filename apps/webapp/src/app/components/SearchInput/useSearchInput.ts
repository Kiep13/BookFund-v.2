import { useCallback, useState, SyntheticEvent, KeyboardEvent } from 'react';
import { debounce } from 'lodash';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { IOption, ISearchOptions, ISearchResults } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { DEFAULT_SEARCH_OPTIONS, DELAY, ENTER_CODE } from './constants';
import { useSearchOptions } from './hooks';

export const useSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<IOption[]>([]);

  const { search } = useApi();
  const { addError }  = useAlerts();
  const { transformSearchResultsToOptions, handleSearchOptionSelect, navigateToSearchPage } = useSearchOptions();

  const handleChange = (event: SyntheticEvent, value: string): void => {
    setSearchTerm(value);
  }

  const groupOptions = (results: ISearchResults): void => {
    const transformedOptions: IOption[] = transformSearchResultsToOptions(results);
    setOptions(transformedOptions);
  }

  const handleOptionSelect = (event: SyntheticEvent, value: IOption | null): void => {
    if(!value) return;

    handleSearchOptionSelect(value);
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    if(event.code !== ENTER_CODE || !searchTerm) {
      return;
    }

    navigateToSearchPage(searchTerm);
  }

  const loadSearchResults = useCallback(
    debounce(async (searchTerm: string) => {
      if(!searchTerm) {
        return;
      }

      setLoading(true);

      const searchOptions: ISearchOptions = {
        ...DEFAULT_SEARCH_OPTIONS,
        searchTerm
      }

      search(searchOptions)
        .then((response: ISearchResults) => {
          groupOptions(response);
        })
        .catch(() => {
          addError(API_TOOLTIP_ERROR);
        })
        .finally(() => {
          setLoading(false);
        });
    }, DELAY),
    []
  );

  const groupBy = (option: IOption): string => option?.groupBy || '';

  const getOptionLabel = (option: IOption): string => option.title;

  return {
    searchTerm,
    options,
    loading,
    loadSearchResults,
    handleOptionSelect,
    handleChange,
    handleKeyDown,
    groupBy,
    getOptionLabel
  }
}
