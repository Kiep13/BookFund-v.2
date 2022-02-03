import { Box, Button } from '@mui/material';
import * as React from 'react';

import Input from '@shared/components/form-components/input';

import { STYLES_IMAGE_FORM } from '../../constants';
import { IProps } from './props.interface';

export default function ImageForm(props: IProps) {
  const { form, imageUrlFieldName, imageFileFieldName } = props;
  const { setFieldValue, values } = form;

  const handleFileUpload = (event: any) => {
    setFieldValue(imageFileFieldName, event.currentTarget.files[0]);
  }

  return (
    <Box sx={STYLES_IMAGE_FORM.formWrapper}>
      <Box sx={STYLES_IMAGE_FORM.fileInputWrapper}>
        <input
          id={imageFileFieldName}
          accept='image/*'
          style={STYLES_IMAGE_FORM.fileInput}
          type='file'
          value={values[imageFileFieldName]}
          onChange={handleFileUpload}
        />
        <label htmlFor={imageFileFieldName}>
          <Button variant='outlined' component='span'>
            Upload photo
          </Button>
        </label>
      </Box>

      <Box sx={STYLES_IMAGE_FORM.orPutLabel}>
        or put
      </Box>

      <Input id={imageUrlFieldName} label={'Url link here'} fieldName={imageUrlFieldName} form={form} styles={STYLES_IMAGE_FORM.urlInput}/>
    </Box>
  );
}
