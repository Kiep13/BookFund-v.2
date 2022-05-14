import { SyntheticEvent, useState } from 'react';

import { IOption } from '@utils/interfaces';

import { IProps } from './propsInterface';

export const useAutocompleteMultiInput = (props: IProps) => {
  const {fieldName, form} = props;
  const {values, handleBlur, touched, errors} = form;

  const initDefaultOptions = (): IOption[] => {
    return values[fieldName].length ? values[fieldName].map(
      (valueItem: any): IOption => {
        return {
          id: valueItem.id,
          title: valueItem.name || valueItem.title
        }
      }) : []
  }

  const [value, setValue] = useState<IOption[]>(initDefaultOptions());
  const [options, setOptions] = useState<IOption[]>(props.options || []);
  const [loading, setLoading] = useState<boolean>(props.loading || false);

  const handleTyping = (event: SyntheticEvent): void => {
    const {value} = event.target as HTMLTextAreaElement;

    props.handleTyping(value);
  }

  const handleSelecting = (event: SyntheticEvent, value: IOption[]): void => {
    setValue(value);

    form.setFieldValue(fieldName, value);

    props.handleTyping('');
  }

  const handleOptionEqualToValue = (option: IOption, value: IOption): boolean => option.id === value.id;

  const getOptionLabel = (option: IOption): string => option.title;

  return {
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
    handleBlur
  }
}
