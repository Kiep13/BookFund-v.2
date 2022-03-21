import { Box, Button } from '@mui/material';

import { Input } from '@components/formСomponents/Input';

import { STYLES_IMAGE_FORM } from '../../constants';
import { IProps } from './props.interface';

export const ImageForm = (props: IProps) => {
  const { form, imageUrlFieldName, imageFileFieldName } = props;

  const handleFileUpload = (event: any) => {
    form.setFieldValue(imageFileFieldName, event.currentTarget.files[0]);
  }

  return (
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
          <Button variant='outlined' component='span'>
            Upload photo
          </Button>
        </label>
      </Box>

      <Box sx={STYLES_IMAGE_FORM.orPutLabel}>
        or put
      </Box>

      <Input
        id={imageUrlFieldName}
        label={'Url link here'}
        fieldName={imageUrlFieldName}
        form={form}
        styles={STYLES_IMAGE_FORM.urlInput}/>
    </Box>
  );
}
