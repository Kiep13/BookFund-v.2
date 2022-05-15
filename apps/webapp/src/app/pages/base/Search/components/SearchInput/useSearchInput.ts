import { useState, KeyboardEvent } from 'react';

import { ENTER_CODE } from '../../constants';

export const useSearchInput = (searchTerm: string, handleSubmit: Function) => {
  const [value, setValue] = useState<string>(searchTerm);

  const handleChange = (event: any): void => {
    setValue(event.target.value);
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    if(event.code !== ENTER_CODE || !value) {
      return;
    }

    handleSubmit(value);
  }

  const handleEnter = (): void => {
    if(!value) {
      return;
    }

    handleSubmit(value);
  }

  return {
    value,
    handleChange,
    handleKeyDown,
    handleEnter
  }
}
