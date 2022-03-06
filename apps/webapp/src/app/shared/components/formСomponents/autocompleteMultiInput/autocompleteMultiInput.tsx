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

  const inputValue = values[fieldName].length ? values[fieldName].map(
    (valueItem: any): IOption => {
      return {
        id: valueItem.id,
        title: valueItem.name || valueItem.title
      }
    }) : [];

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
      onChange={handleSelecting}
      options={options}
      loading={loading}
      value={inputValue}
      isOptionEqualToValue={(option: IOption, value: IOption) => option.id === value.id}
      getOptionLabel={(option: IOption) => option.title}
      renderTags={(tagValue: IOption[], getTagProps) =>
        tagValue.map((option: IOption, index: number) => (
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
