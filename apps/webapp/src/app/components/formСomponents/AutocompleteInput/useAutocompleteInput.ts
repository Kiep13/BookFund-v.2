import { SyntheticEvent, useState } from 'react';

import { IOption } from '@utils/interfaces';

import { IProps } from './propsInterface';

export const useAutocompleteInput = (props: IProps) => {
  const {fieldName, form} = props;
  const {values, handleBlur, touched, errors} = form;

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<IOption[]>(props.options || []);
  const [loading, setLoading] = useState<boolean>(props.loading || false);
  const [inputValue, setInputValue] = useState<IOption | null>(values[fieldName] ? {
    id: values[fieldName]?.id,
    title: values[fieldName]?.title || values[fieldName]?.name
  } : null);

  const handleTyping = (event: SyntheticEvent): void => {
    const {value} = event.target as HTMLTextAreaElement;
    props.handleTyping(value);
  }

  const handleSelecting = (event: SyntheticEvent, value: IOption | null): void => {
    form.setFieldValue(fieldName, value);
    setInputValue(value);
    props.handleSelecting && props.handleSelecting(value);

    if (!value) {
      props.handleTyping('');
    }
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleOptionEqualToValue = (option: IOption, value): boolean => option.id === value.id;

  const getOptionLabel = (option: IOption): string => option?.title || '';

  return {
    open,
    fieldName,
    inputValue,
    options,
    values,
    errors,
    touched,
    loading,
    setOptions,
    setLoading,
    handleSelecting,
    handleTyping,
    handleBlur,
    handleOptionEqualToValue,
    getOptionLabel,
    handleOpen,
    handleClose
  }
}
