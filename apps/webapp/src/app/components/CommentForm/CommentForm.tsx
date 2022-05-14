import { Box } from '@mui/material';

import { FeedbackStep, RateStep } from './components';
import { STYLES } from './constants';
import { States } from './enums';
import { useCommentForm } from './useCommentForm';
import { IProps } from './propsInterface';

export const CommentForm = ({book, handleSaving}: IProps) => {
  const {
    step,
    handleRate,
    handleSaveWithFeedback,
    handleSaveWithoutFeedback
  } = useCommentForm(book, handleSaving);

  return (
    <Box sx={STYLES.wrapper}>
      {step === States.RATE && <RateStep handleRate={handleRate}/>}
      {step === States.FEEDBACK &&
      <FeedbackStep
        saveWithFeedback={handleSaveWithFeedback}
        saveWithoutFeedback={handleSaveWithoutFeedback}
      />}
    </Box>
  )
}
