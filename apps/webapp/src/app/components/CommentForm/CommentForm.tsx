import { Box } from '@mui/material';
import { useState } from 'react';

import { API_OPERATION_ERROR } from '@utils/constants';
import { IComment } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { FeedbackStep, RateStep } from './components';
import { SUCCESSFULLY_ADDED, STYLES } from './constants';
import { States } from './enums';
import { IProps } from './propsInterface';

export const CommentForm = ({book, handleSaving}: IProps) => {
  const [step, setStep] = useState<States>(States.RATE);
  const [rate, setRate] = useState<number>();

  const { addComment } = useApi();
  const { addSuccess, addError } = useAlerts();

  const handleSave = (comment: IComment) => {
    addComment(comment)
      .then((response: IComment) => {
        addSuccess(SUCCESSFULLY_ADDED);
        handleSaving(response);
      })
      .catch(() => {
        addError((API_OPERATION_ERROR));
      })
  }

  const handleRate = (value: number) => {
    setRate(value);
    setStep(States.FEEDBACK);
  }

  const handleSaveWithFeedback = (feedback: string) => {
    const comment: IComment = {
      book,
      rate: rate || 0,
      text: feedback
    }

    handleSave(comment);
  }

  const handleSaveWithoutFeedback = () => {
    const comment: IComment = {
      book,
      rate: rate || 0
    }

    handleSave(comment);
  }

  return (
    <Box sx={STYLES.wrapper}>
      { step === States.RATE && <RateStep handleRate={handleRate}/> }
      { step === States.FEEDBACK && <FeedbackStep saveWithFeedback={handleSaveWithFeedback}
                                                  saveWithoutFeedback={handleSaveWithoutFeedback}/> }
    </Box>
  )
}
