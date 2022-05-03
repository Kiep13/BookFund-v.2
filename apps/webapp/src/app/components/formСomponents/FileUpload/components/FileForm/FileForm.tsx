import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

import { ERROR_INVALID_EXTENSION, PDF_REG_EXP, STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const FileForm = ({form, fileFieldName, fileNameFieldName}: IProps) => {
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: any) => {
    const file: File = event.currentTarget.files[0];

    if(!file.name.match(PDF_REG_EXP)) {
      setError(ERROR_INVALID_EXTENSION);

      return;
    }

    form.setFieldValue(fileNameFieldName, file.name);
    form.setFieldValue(fileFieldName, file);
  }

  return (
    <label htmlFor='pdf-book-file'>
      <Box sx={STYLES.fileForm.input}>
        <input
          accept='application/pdf'
          id='pdf-book-file'
          type='file'
          onChange={handleFileUpload}
        />
      </Box>
      <Box sx={{
        ...STYLES.fileForm.label,
        ...(error ? STYLES.fileForm.errorLabel : {})
      }}>
        <Button
          variant='outlined'
          component='span'
          sx={{
            ...(error ? STYLES.fileForm.errorButton : {})
          }}
        >
          Upload book file
        </Button>
        <Typography component='legend'>Select a pdf file</Typography>
      </Box>
      {
        error &&
        <Typography
          component='legend'
          sx={STYLES.fileForm.error}>
          {error}
        </Typography>
      }
    </label>
  )
}
