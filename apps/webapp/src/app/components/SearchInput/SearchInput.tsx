import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Autocomplete, AutocompleteRenderInputParams, InputAdornment, TextField } from '@mui/material';
import { useCallback, useEffect, useState, SyntheticEvent, KeyboardEvent } from 'react';
import { debounce } from 'lodash';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { IOption, ISearchOptions, ISearchResults } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { DEFAULT_SEARCH_OPTIONS, DELAY, ENTER_CODE, INPUT_LABEL, NO_OPTIONS_TEXT, STYLES } from './constants';
import { useSearchOptions } from './hooks';

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<IOption[]>([]);

  const { search } = useApi();
  const { addError }  = useAlerts();
  const { transformSearchResultsToOptions, handleSearchOptionSelect, navigateToSearchPage } = useSearchOptions();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setSearchTerm(value);
  }

  const groupOptions = (results: ISearchResults) => {
    const transformedOptions: IOption[] = transformSearchResultsToOptions(results);
    setOptions(transformedOptions);
  }

  const handleOptionSelect = (event: SyntheticEvent, value: IOption | null) => {
    if(!value) return;

    handleSearchOptionSelect(value);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
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

  useEffect(() => {
    loadSearchResults(searchTerm)
  }, [searchTerm]);

  return (
    <Autocomplete
      options={options}
      groupBy={(option) => option?.groupBy || ''}
      getOptionLabel={(option) => option.title}
      loading={loading}
      sx={STYLES.autocomplete}
      forcePopupIcon={false}
      noOptionsText={NO_OPTIONS_TEXT}
      onChange={handleOptionSelect}
      onInputChange={handleChange}
      renderInput={(params:  AutocompleteRenderInputParams) =>
        <TextField {...params}
                   label={INPUT_LABEL}
                   onKeyDown={handleKeyDown}
                   InputProps={{
                     ...params.InputProps,
                     endAdornment: (
                       <InputAdornment position="end">
                         <SearchTwoToneIcon/>
                       </InputAdornment>
                     )
                   }}/>
      }
    />
  )
}
