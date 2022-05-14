import { Box, Button, TextField } from '@mui/material';

import { STYLES } from './constants';
import { useFeedbackStep } from './useFeedbackStep';
import { IProps } from './propsInterface';

export const FeedbackStep = ({saveWithFeedback, saveWithoutFeedback}: IProps) => {
  const {
    value,
    handleChange,
    handleWithoutFeedback,
    handleWithFeedback
  } = useFeedbackStep(saveWithFeedback, saveWithoutFeedback);

  return (
    <>
      <TextField
        label='Your feedback'
        variant='standard'
        multiline
        fullWidth={true}
        autoFocus={true}
        value={value}
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
        }}
        sx={STYLES.input}
      />

      <Box sx={STYLES.buttonsWrapper}>
        {!Boolean(value) &&
        <Button variant='outlined'
                sx={STYLES.leftButton}
                onClick={handleWithoutFeedback}>
          Save without feedback
        </Button>}
        <Button variant='contained' onClick={handleWithFeedback}>Save</Button>
      </Box>
    </>
  )
}

