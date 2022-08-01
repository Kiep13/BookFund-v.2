import { FormikHelpers } from 'formik/dist/types';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IArticleFolder, IFormPageParams } from '@utils/interfaces';

import { FORM_INITIAL_VALUE, SUCCESSFULLY_ADDED, SUCCESSFULLY_UPDATED, VALIDATION_SCHEMA } from './constants';
import { IArticleFolderForm } from './interfaces';

export const useFolderForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {getFolder, addFolder, updateFolder} = useApi();
  const {addSuccess, addError} = useAlerts();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

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
    navigate(`${BaseRoutePaths.ARTICLES}`);
  }

  const handleCancelClick = (): void => {
    navigateToArticlesPage();
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const initForm = (): void => {
    const folderId = (params as IFormPageParams).id;

    if (!folderId) {
      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    getFolder(folderId)
      .then((folder: IArticleFolder) => {
        formik.setValues({
          ...folder
        });

        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  return {
    pageState,
    formik,
    editMode,
    initForm,
    handleCancelClick
  }
}
