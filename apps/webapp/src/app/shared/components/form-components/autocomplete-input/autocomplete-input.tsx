import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import * as React from 'react';

import { IProps } from './props.interface';

export default function AutocompleteInput(props: IProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(props.options || []);
  const [loading, setLoading] = React.useState(props.loading || false);

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
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
