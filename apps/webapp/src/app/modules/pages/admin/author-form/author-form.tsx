import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { AdminRoutePaths } from '@core/enums';
import ImageUpload from '@features/image-upload';
import Card from '@shared/components/card';
import Input from '@shared/components/form-components/input';
import { apiService } from '@shared/services';

import { FORM_INITIAL_VALUE, STYLES, VALIDATION_SCHEMA } from './constants';
import { IAuthorForm } from './interfaces';

export const AuthorForm = () => {
  const history = useHistory();

  const handleSubmit = async (values: IAuthorForm, {setSubmitting}: FormikHelpers<IAuthorForm>) => {
    if(values.imageFile) {
      const formData = new FormData();
      formData.append('image', values.imageFile);

      values.imageUrl = await(await apiService.saveImage(formData));
    }

    await apiService.addAuthor(values);
    navigateToAuthorsPage();
    setSubmitting(false);
  }

  const navigateToAuthorsPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`);
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

        <Input
          id={'biography'}
          label={'Biography'}
          fieldName={'biography'}
          form={formik}
          multiline
          maxRows={10}
          styles={STYLES.biographyInput}/>

        <Box sx={STYLES.formButtons}>
          <Button variant='outlined' sx={STYLES.cancelButton} onClick={navigateToAuthorsPage}>Cancel</Button>
          <Button
            variant='contained'
            type='submit'
            disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}>
            Save
          </Button>
        </Box>

      </form>
    </Box>

  </Card>)
}
