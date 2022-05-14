import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { IFormPageParams, IGenre, IGenreFormPageState } from '@utils/interfaces';
import { AdminRoutePaths, CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

import {
  FORM_INITIAL_VALUE,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  VALIDATION_SCHEMA
} from './constants';
import { IGenreForm } from './interfaces';

export const useGenreForm = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {getGenre, addGenre, updateGenre} = useApi();
  const {addSuccess, addError} = useAlerts();

  const callSubmitAction = (values: IGenreForm) => {
    const genreId = (params as IFormPageParams).id;
    return editMode ?
      updateGenre(genreId, values).then(() => {
        return addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      addGenre(values).then(() => {
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

    if (!genreId) {
      const predefinedParent = (location.state as IGenreFormPageState)?.parent;
      if (predefinedParent) {
        formik.setFieldValue('parent', predefinedParent);
      }

      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    await getGenre(genreId)
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

  return {
    formik,
    editMode,
    pageState,
    initForm,
    navigateToGenresPage
  }
}
