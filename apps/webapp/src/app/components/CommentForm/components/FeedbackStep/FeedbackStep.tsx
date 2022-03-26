import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const FeedbackStep = ({ saveWithFeedback, saveWithoutFeedback }: IProps) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <>
      <TextField
        label='Your feedback'
        multiline
        fullWidth={true}
        autoFocus={true}
        variant={'standard'}
        value={value}
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
        }}
        sx={STYLES.input}
      />

      <Box sx={STYLES.buttonsWrapper}>
        { !Boolean(value) && <Button variant='outlined'
                                     sx={STYLES.leftButton}
                                     onClick={() => saveWithoutFeedback()}>
                                      Save without feedback
                             </Button>}
        <Button variant='contained' onClick={() => saveWithFeedback(value)}>Save</Button>
      </Box>
    </>
  )
}

