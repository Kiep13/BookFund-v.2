import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { HTMLAttributes, SyntheticEvent, useEffect } from 'react';
import * as React from 'react';

import { IOption } from '@core/interfaces';

import { IProps } from './props.interface';

export default function AutocompleteInput(props: IProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(props.options || []);
  const [loading, setLoading] = React.useState(props.loading || false);

  const {fieldName, form} = props;
  const {values, handleBlur, touched, errors } = form;

  useEffect(() => {
    setOptions(props.options);
    setLoading(props.loading);
  }, [props]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
      isOptionEqualToValue={(option: any, value) => option.title === value.title}
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
