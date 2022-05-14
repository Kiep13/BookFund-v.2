import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IAuthor, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';

import {
  FORM_INITIAL_VALUE,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  VALIDATION_SCHEMA
} from './constants';
import { IAuthorForm } from './interfaces';

export const useAuthorForm = () => {
  const params = useParams();
  const {updateAuthor, addAuthor, saveImage, getAuthor} = useApi();
  const {addError, addSuccess} = useAlerts();
  const {navigateToAdminAuthorsPage} = useAuthorActions();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: IAuthorForm) => {
    const authorId = (params as IFormPageParams).id;

    return editMode ?
      updateAuthor(authorId, values).then(() => {
        addSuccess(SUCCESSFULLY_UPDATED)
      }) :
      addAuthor(values).then(() => {
        addSuccess(SUCCESSFULLY_ADDED)
      });
  }

  const handleSubmit = async (values: IAuthorForm, {setSubmitting}: FormikHelpers<IAuthorForm>) => {
    try {
      if (values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await (await saveImage(formData));
      }

      await callSubmitAction(values);
      navigateToAdminAuthorsPage();
    } catch (e) {
      addError(API_TOOLTIP_ERROR);
    } finally {
      setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const initForm = async () => {
    const authorId = (params as IFormPageParams).id;

    if (!authorId) {
      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    await getAuthor(authorId)
      .then((author: IAuthor) => {
        formik.setValues({
          ...author,
          biography: author.biography || '',
          imageUrl: author.image
        });

        setPageState(CardStates.CONTENT)
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
    navigateToAdminAuthorsPage
  }
}
