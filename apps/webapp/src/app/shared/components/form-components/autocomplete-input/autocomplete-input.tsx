import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import * as React from 'react';

import { IProps } from './props.interface';

export default function AutocompleteInput(props: IProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(props.options || []);
  const [loading, setLoading] = React.useState(props.loading || false);

  const {fieldName, form} = props;
  const {values, handleChange, handleBlur} = form;

  useEffect(() => {
    setOptions(props.options);
    setLoading(props.loading);
  }, [props]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
      renderInput={(params) => (
        <TextField
          name={fieldName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[fieldName]}
          label={props.label}
          {...params}
        />
      )}
    />
  );
}
