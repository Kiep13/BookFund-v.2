import { useState } from 'react';

export const useFeedbackStep = (saveWithFeedback: Function, saveWithoutFeedback: Function) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleWithoutFeedback = () => {
    saveWithoutFeedback();
  }

  const handleWithFeedback = () => {
    saveWithFeedback(value);
  }

  return {
    value,
    handleChange,
    handleWithoutFeedback,
    handleWithFeedback
  }
}
