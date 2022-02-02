import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';

import { validateBigText, validateName } from '@core/validators';
import ImageUpload from '@features/image-upload';
import Card from '@shared/components/card';

import { FORM_INITIAL_VALUE } from './constants';
import { IAuthorForm } from './interfaces';

export default function AuthorForm() {
  const validate = (formValues: IAuthorForm) => {
    const errors = {
      name: validateName(formValues.name),
      surname: validateName(formValues.surname),
      biography: validateBigText(formValues.biography)
    };

    return errors;
  }

  const submitForm = (values: IAuthorForm, {setSubmitting}: FormikHelpers<IAuthorForm>) => {
    console.log(values);
    setSubmitting(true);
  }

  return <Formik initialValues={FORM_INITIAL_VALUE} validate={validate} onSubmit={submitForm}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
      <Card>
        <Box sx={{
          maxWidth: 600,
          m: 'auto',
          minHeight: 'calc(100vh - 170px)',
          height: 'fit-content'
        }}>
          <Typography variant='h5'
                      gutterBottom
                      component='div'
                      sx={{
                        fontWeight: 100,
                        textAlign: 'center',
                        mb: 5
                      }}>
            Add new author
          </Typography>

          <form onSubmit={handleSubmit}>

            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 3,
              mb: 3
            }}>
              <TextField id='name'
                         label='Name'
                         type='text'
                         error={Boolean(errors.name && touched.name)}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.name}
                         helperText={errors.name && touched.name && errors.name}
                         sx={{flex: 1}}
              />

              <TextField label='Surname' sx={{
                flex: 1
              }}/>
            </Box>


            <Box sx={{
              mb: 3
            }}>
              <ImageUpload/>
            </Box>

            <TextField
              label='Biography'
              multiline
              maxRows={10}
              sx={{
                mb: 3,
                width: '100%'
              }}
            />

            <Box sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Button variant='outlined' sx={{mr: 2}}>Cancel</Button>
              <Button variant='contained' type='submit' disabled={isSubmitting}>Save</Button>
            </Box>

          </form>
        </Box>

      </Card>
    )}


  </Formik>
}
