import { useState } from 'react';

import { API_OPERATION_ERROR } from '@utils/constants';
import { IBook, IComment } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { SUCCESSFULLY_ADDED } from './constants';
import { States } from './enums';

export const useCommentForm = (book: IBook, handleSaving: Function) => {
  const [step, setStep] = useState<States>(States.RATE);
  const [rate, setRate] = useState<number>();

  const {addComment} = useApi();
  const {addSuccess, addError} = useAlerts();

  const handleSave = (comment: IComment): void => {
    addComment(comment)
      .then((response: IComment) => {
        addSuccess(SUCCESSFULLY_ADDED);
        handleSaving(response);
      })
      .catch(() => {
        addError((API_OPERATION_ERROR));
      })
  }

  const handleRate = (value: number): void => {
    setRate(value);
    setStep(States.FEEDBACK);
  }

  const handleSaveWithFeedback = (feedback: string): void => {
    const comment: IComment = {
      book,
      rate: rate || 0,
      text: feedback
    }

    handleSave(comment);
  }

  const handleSaveWithoutFeedback = (): void => {
    const comment: IComment = {
      book,
      rate: rate || 0
    }

    handleSave(comment);
  }

  return {
    step,
    handleRate,
    handleSaveWithFeedback,
    handleSaveWithoutFeedback
  }
}
