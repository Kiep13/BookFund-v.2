import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';

import ImageUpload from '@features/image-upload';
import Card from '@shared/components/card';
import Input from '@shared/components/form-components/input';

import { FORM_INITIAL_VALUE, STYLES, VALIDATION_SCHEMA } from './constants';
import { IAuthorForm } from './interfaces';

export default function AuthorForm() {
  const handleSubmit = (values: IAuthorForm, {setSubmitting}: FormikHelpers<IAuthorForm>) => {
    console.log(values);
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  return (<Card>
    <Box sx={STYLES.page}>
      <Typography variant='h5'
                  gutterBottom
                  sx={STYLES.pageHeader}>
        Add new author
      </Typography>

      <form onSubmit={formik.handleSubmit}>

        <Box sx={STYLES.nameInputsWrapper}>
          <Input id={'name'} label={'Name'} fieldName={'name'} form={formik} styles={STYLES.nameInput}/>
          <Input id={'surname'} label={'Surname'} fieldName={'surname'} form={formik} styles={STYLES.nameInput}/>
        </Box>


        <Box sx={STYLES.imageUploadWrapper}>
          <ImageUpload alt={`Author's photo`} form={formik} imageUrlFieldName={'imageUrl'} imageFileFieldName={'imageFile'}/>
        </Box>

        <Input id={'biography'} label={'Biography'} fieldName={'biography'} form={formik} multiline maxRows={10}
               styles={STYLES.biographyInput}/>

        <Box sx={STYLES.formButtons}>
          <Button variant='outlined' sx={STYLES.cancelButton}>Cancel</Button>
          <Button variant='contained' type='submit'
                  disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}>Save</Button>
        </Box>

      </form>
    </Box>

  </Card>)
}
