import { FormikHelpers } from 'formik/dist/types';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IFormPageParams } from "@utils/interfaces";

import { FORM_INITIAL_VALUE, SUCCESSFULLY_ADDED, SUCCESSFULLY_UPDATED, VALIDATION_SCHEMA } from './constants';
import { IArticleFolderForm } from './interfaces';

export const useFolderForm = () => {
  const history = useHistory();
  const params = useParams();
  const {addFolder, updateFolder} = useApi();

  const [pageState, setPageState] = useState<CardStates>(CardStates.CONTENT);
  const [editMode, setEditMode] = useState<boolean>(false);
  const {addSuccess, addError} = useAlerts();

  const callSubmitAction = (values: IArticleFolderForm) => {
    const folderId = (params as IFormPageParams).id;
    return editMode ?
      updateFolder(folderId, values).then(() => {
        return addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      addFolder(values).then(() => {
        return addSuccess(SUCCESSFULLY_ADDED);
      });
  }

  const handleSubmit = async (values: IArticleFolderForm, {setSubmitting}: FormikHelpers<IArticleFolderForm>) => {
    await callSubmitAction(values)
      .then(() => {
        navigateToArticlesPage();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  const navigateToArticlesPage = (): void => {
    history.push(`${BaseRoutePaths.ARTICLES}`);
  }

  const handleCancelClick = (): void => {
    navigateToArticlesPage();
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  return {
    pageState,
    formik,
    handleCancelClick
  }
}
