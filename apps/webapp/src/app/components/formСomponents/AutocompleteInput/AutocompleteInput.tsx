import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { HTMLAttributes, useEffect } from 'react';

import { IOption } from '@utils/interfaces';

import { useAutocompleteInput } from './useAutocompleteInput';
import { IProps } from './propsInterface';

export const AutocompleteInput = (props: IProps) => {
  const {
    open,
    fieldName,
    inputValue,
    options,
    values,
    errors,
    touched,
    loading,
    setOptions,
    setLoading,
    handleSelecting,
    handleTyping,
    handleBlur,
    handleOptionEqualToValue,
    getOptionLabel,
    handleOpen,
    handleClose
  } = useAutocompleteInput(props);

  const renderOption = (props: HTMLAttributes<HTMLElement>, option: IOption) => {
    return (
      <li {...props} key={option.id}>
        {option.title}
      </li>
    );
  }

  const renderInput = (params: AutocompleteRenderInputParams) => {
    return <TextField
      name={fieldName}
      onChange={handleTyping}
      onBlur={handleBlur}
      value={values[fieldName]}
      label={props.label}
      helperText={errors[fieldName] && touched[fieldName] && errors[fieldName]?.toString()}
      {...params}
    />
  }

  useEffect(() => {
    setOptions(props.options);
    setLoading(props.loading);
  }, [props]);

  return (
    <Autocomplete
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={handleOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      onChange={handleSelecting}
      value={inputValue}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
}
