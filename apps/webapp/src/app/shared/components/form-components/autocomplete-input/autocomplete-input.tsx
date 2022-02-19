import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { HTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';

import { IOption } from '@core/interfaces';

import { IProps } from './props.interface';

export const AutocompleteInput = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(props.options || []);
  const [loading, setLoading] = useState(props.loading || false);

  const {fieldName, form} = props;
  const {values, handleBlur, touched, errors } = form;

  useEffect(() => {
    setOptions(props.options);
    setLoading(props.loading);
  }, [props]);

  const handleTyping = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    props.handleTyping(value);
  }

  const handleSelecting = (event: SyntheticEvent, value: IOption | null) => {
    form.setFieldValue(fieldName, value?.id);

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
      isOptionEqualToValue={(option: any, value) => option.id === value.id}
      getOptionLabel={(option: any) => option.title}
      options={options}
      loading={loading}
      onChange={handleSelecting}
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
