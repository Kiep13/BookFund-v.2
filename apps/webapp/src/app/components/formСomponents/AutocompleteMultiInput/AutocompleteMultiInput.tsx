import { Autocomplete, Chip, TextField } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { HTMLAttributes, useEffect } from 'react';

import { IOption } from '@utils/interfaces';

import { IProps } from './propsInterface';
import { useAutocompleteMultiInput } from './useAutocompleteMultiInput';

export const AutocompleteMultiInput = (props: IProps) => {
  const {
    value,
    options,
    loading,
    fieldName,
    values,
    errors,
    touched,
    setOptions,
    setLoading,
    getOptionLabel,
    handleOptionEqualToValue,
    handleSelecting,
    handleTyping,
    handleBlur,
  } = useAutocompleteMultiInput(props);

  useEffect(() => {
    setOptions(props.options);
    setLoading(props.loading);
  }, [props]);

  const renderTags = (tagValue: IOption[], getTagProps) => {
     return tagValue.map((option: IOption, index: number) => (
        <Chip label={option.title} {...getTagProps({ index })}/>
      ))
  }

  const renderOption = (props: HTMLAttributes<HTMLElement>, option: IOption) => {
    return (
      <li {...props} key={option.id}>
        {option.title}
      </li>
    );
  }

  const renderInput = (params: AutocompleteRenderInputParams ) => (
    <TextField
      name={fieldName}
      onChange={handleTyping}
      onBlur={handleBlur}
      value={values[fieldName]}
      label={props.label}
      helperText={errors[fieldName] && touched[fieldName] && errors[fieldName]?.toString()}
      {...params}
    />
  )

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={handleSelecting}
      options={options}
      loading={loading}
      isOptionEqualToValue={handleOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderTags={renderTags}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
}
