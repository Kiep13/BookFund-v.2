import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { HTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';

import { IOption } from '@core/interfaces';

import { IProps } from './props.interface';

export const AutocompleteInput = (props: IProps) => {
  const { fieldName, form } = props;
  const { values, handleBlur, touched, errors } = form;

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<IOption[]>(props.options || []);
  const [loading, setLoading] = useState<boolean>(props.loading || false);
  const [inputValue, setInputValue] = useState<IOption | null>(values[fieldName] ? {
    id: values[fieldName]?.id,
    title: values[fieldName]?.title || values[fieldName]?.name
  } : null);

  useEffect(() => {
    setOptions(props.options);
    setLoading(props.loading);
  }, [props]);

  const handleTyping = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    props.handleTyping(value);
  }

  const handleSelecting = (event: SyntheticEvent, value: IOption | null) => {
    form.setFieldValue(fieldName, value);
    setInputValue(value);
    props.handleSelecting && props.handleSelecting(value);

    if(!value) {
      props.handleTyping('');
    }
  }

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option: IOption, value) => option.id === value.id}
      getOptionLabel={(option: IOption) => option?.title || ''}
      options={options}
      loading={loading}
      onChange={handleSelecting}
      value={inputValue}
      renderOption={(props: HTMLAttributes<HTMLElement>, option: IOption) => {
        return (
          <li {...props} key={option.id}>
            {option.title}
          </li>
        );
      }}
      renderInput={(params: AutocompleteRenderInputParams ) => (
        <TextField
          name={fieldName}
          onChange={handleTyping}
          onBlur={handleBlur}
          value={values[fieldName]}
          label={props.label}
          helperText={errors[fieldName] && touched[fieldName] && errors[fieldName]}
          {...params}
        />
      )}
    />
  );
}
