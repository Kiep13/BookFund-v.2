import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { StatefulCard } from '@components/cards/StatefulCard';
import { Input } from '@components/formСomponents/Input';
import { Card } from '@components/cards/Card';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { IFormPageParams, IGenre, IGenreFormPageState } from '@utils/interfaces';
import { AdminRoutePaths, CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

import { GenreAutocomplete } from './components/GenreAutocomplete';
import {
  FORM_INITIAL_VALUE,
  STYLES, SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  TITLE_ADD,
  TITLE_EDIT,
  VALIDATION_SCHEMA
} from './constants';
import { IGenreForm } from './interfaces';

export const GenreForm = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const api = useApi();
  const { addSuccess, addError } = useAlerts();

  const callSubmitAction = (values: IGenreForm) => {
    const genreId = (params as IFormPageParams).id;
    return editMode ?
      api.updateGenre(genreId, values).then(() => {
        return addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      api.addGenre(values).then(() => {
        return addSuccess(SUCCESSFULLY_ADDED);
      });
  }

  const handleSubmit = async (values: IGenreForm, {setSubmitting}: FormikHelpers<IGenreForm>) => {
    await callSubmitAction(values)
      .then(() => {
        navigateToGenresPage();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const navigateToGenresPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`);
  }

  const initForm = async () => {
    const genreId = (params as IFormPageParams).id;

    if(!genreId) {
      const predefinedParent = (location.state as IGenreFormPageState)?.parent;
      if(predefinedParent) {
        formik.setFieldValue('parent', predefinedParent);
      }

      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    await api.getGenre(genreId)
      .then((genre: IGenre) => {
        formik.setValues({
          ...genre
        });

        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  useEffect(() => {
    initForm();
    return;
  }, [])

  return <Card>
    <Box sx={STYLES.page}>
      <StatefulCard state={pageState}>
        <Typography
          variant='h5'
          gutterBottom
          component='div'
          sx={STYLES.pageHeader}>
          { editMode ? TITLE_EDIT : TITLE_ADD}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Input
            id={'name'}
            label={'Name'}
            fieldName={'name'}
            form={formik}
            styles={STYLES.nameInput}/>

          <Box sx={STYLES.parentInputWrapper}>
            <GenreAutocomplete form={formik} fieldName={'parent'}/>
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
      </StatefulCard>
    </Box>
  </Card>
}
