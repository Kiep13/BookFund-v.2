import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Autocomplete, AutocompleteRenderInputParams, InputAdornment, TextField } from '@mui/material';
import { useEffect } from 'react';

import { INPUT_LABEL, NO_OPTIONS_TEXT, STYLES } from './constants';
import { useSearchInput } from './useSearchInput';

export const SearchInput = () => {
  const {
    searchTerm,
    options,
    loading,
    loadSearchResults,
    handleOptionSelect,
    handleChange,
    handleKeyDown,
    groupBy,
    getOptionLabel
  } = useSearchInput();

  useEffect(() => {
    loadSearchResults(searchTerm)
  }, [searchTerm]);

  const renderInput = (params: AutocompleteRenderInputParams) =>
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

  return (
    <Autocomplete
      options={options}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      loading={loading}
      sx={STYLES.autocomplete}
      forcePopupIcon={false}
      noOptionsText={NO_OPTIONS_TEXT}
      onChange={handleOptionSelect}
      onInputChange={handleChange}
      renderInput={renderInput}
    />
  )
}
