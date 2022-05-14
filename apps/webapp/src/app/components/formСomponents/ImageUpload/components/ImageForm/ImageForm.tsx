import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

import { Input } from '@components/formСomponents/Input';

import { ERROR_INVALID_EXTENSION, IMAGE_REG_EXP, STYLES_IMAGE_FORM } from '../../constants';
import { IProps } from './propsInterface';

export const ImageForm = ({form, imageUrlFieldName, imageFileFieldName}: IProps) => {
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (event: any) => {
    const file = event.currentTarget.files[0];

    if (!file.name.match(IMAGE_REG_EXP)) {
      setError(ERROR_INVALID_EXTENSION);
      return;
    }

    form.setFieldValue(imageFileFieldName, event.currentTarget.files[0]);
    await form.validateForm({...form.values, [imageFileFieldName]: event.currentTarget.files[0]});
  }

  return (
    <>
      <Box sx={STYLES_IMAGE_FORM.formWrapper}>
        <Box sx={STYLES_IMAGE_FORM.fileInputWrapper}>
          <input
            id={imageFileFieldName}
            accept='image/*'
            style={STYLES_IMAGE_FORM.fileInput}
            type='file'
            onChange={handleFileUpload}
          />
          <label htmlFor={imageFileFieldName}>
            <Button
              variant='outlined'
              component='span'
              sx={{
                ...(error ? STYLES_IMAGE_FORM.errorButton : {})
              }}
            >
              Upload photo
            </Button>
          </label>
        </Box>

        <Box sx={STYLES_IMAGE_FORM.orPutLabel}>
          or put
        </Box>

        <Input
          id={imageUrlFieldName}
          label='Url link here'
          fieldName={imageUrlFieldName}
          form={form}
          styles={STYLES_IMAGE_FORM.urlInput}
        />
      </Box>
      {error &&
      <Typography
        component='legend'
        sx={STYLES_IMAGE_FORM.errorText}>
        {error}
      </Typography>}
    </>
  );
}
