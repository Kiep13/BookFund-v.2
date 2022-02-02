import * as React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

import { IOption } from '@core/interfaces';

export default function AutocompleteMultiInput(props: any) {
  const { label, options } = props;

  const initialValue: IOption[] = [];
  const [value, setValue] = React.useState(initialValue);

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue: IOption[]) => {
        setValue(newValue);
      }}
      options={options}
      getOptionLabel={(option: IOption) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option: IOption, index) => (
          <Chip label={option.title}{...getTagProps({ index })}/>
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={label}/>
      )}
    />
  );
}
