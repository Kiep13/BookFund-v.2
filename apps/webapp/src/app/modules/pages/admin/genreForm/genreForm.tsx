import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { AdminRoutePaths } from '@core/enums';
import { Input } from '@shared/components/formСomponents/input';
import { Card } from '@shared/components/card';
import { apiService } from '@shared/services';

import { GenreAutocomplete } from './components/genreAutocomplete';
import { FORM_INITIAL_VALUE, STYLES, VALIDATION_SCHEMA } from './constants';
import { IGenreForm } from './interfaces';

export const GenreForm = () => {
  const history = useHistory();

  const handleSubmit = async (values: IGenreForm, {setSubmitting}: FormikHelpers<IGenreForm>) => {
    await apiService.addGenre(values);
    navigateToGenresPage();
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const navigateToGenresPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`);
  }

  return <Card>
    <Box sx={STYLES.page}>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={STYLES.pageHeader}>
        Add new genre
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Input
          id={'name'}
          label={'Name'}
          fieldName={'name'}
          form={formik}
          styles={STYLES.nameInput}/>

        <Box sx={STYLES.parentInputWrapper}>
          <GenreAutocomplete form={formik} fieldName={'parentGenre'}/>
        </Box>


        <Box sx={STYLES.formButtons}>
          <Button
            variant='outlined'
            sx={STYLES.cancelButton}
            onClick={navigateToGenresPage}>
            Cancel
          </Button>

          <Button
            variant='contained'
            type='submit'
            disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}>
            Save
          </Button>
        </Box>

      </form>
    </Box>

  </Card>
}
