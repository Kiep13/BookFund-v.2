import { Autocomplete, Chip, TextField } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { HTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';

import { IOption } from '@core/interfaces';

import { IProps } from './props.interface';

export const AutocompleteMultiInput = (props: IProps) => {
  const [value, setValue] = useState<IOption[]>([]);
  const [options, setOptions] = useState<IOption[]>(props.options || []);
  const [loading, setLoading] = useState<boolean>(props.loading || false);

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

  const handleSelecting = (event: SyntheticEvent, value: IOption[]) => {
    setValue(value);

    form.setFieldValue(fieldName, value);

    props.handleTyping('');
  }

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={handleSelecting}
      options={options}
      loading={loading}
      isOptionEqualToValue={(option: any, value) => option.id === value.id}
      getOptionLabel={(option: IOption) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option: IOption, index) => (
          <Chip label={option.title}{...getTagProps({ index })}/>
        ))
      }
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
