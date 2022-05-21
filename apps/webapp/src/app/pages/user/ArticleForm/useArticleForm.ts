import { SelectChangeEvent } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';
import { useFormik } from 'formik';
import { useState } from 'react';

import { API_TOOLTIP_ERROR, DEFAULT_FOLDER_NAME } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IArticle, IArticleFolder, IFormPageParams, IListApiView } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { FORM_INITIAL_VALUE, SUCCESSFULLY_ADDED, SUCCESSFULLY_UPDATED, VALIDATION_SCHEMA } from './constants';
import { IArticleForm } from './interfaces';

export const useArticleForm = () => {
  const history = useHistory();
  const params = useParams();
  const {getFolders, getArticle, addArticle, updateArticle} = useApi();
  const {addSuccess, addError} = useAlerts();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [folderOptions, setFolderOptions] = useState<IArticleFolder[]>([]);

  const callSubmitAction = (values: IArticleForm) => {
    const folderId = (params as IFormPageParams).id;
    return editMode ?
      updateArticle(folderId, values).then(() => {
        return addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      addArticle(values).then(() => {
        return addSuccess(SUCCESSFULLY_ADDED);
      });
  }

  const navigateToPreviousPage = (): void => {
    history.goBack();
  }

  const handleSubmit = async (values: IArticleForm, {setSubmitting}: FormikHelpers<IArticleForm>) => {
    await callSubmitAction(values)
      .then(() => {
        navigateToPreviousPage();
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

  const initForm = (): void => {
    const articleId = (params as IFormPageParams).id;

    getFolders()
      .then((response: IListApiView<IArticleFolder> ) => {
        setFolderOptions(response.data);

        if (!articleId) {
          const defaultFolder =  response.data.find((folder) => folder.name === DEFAULT_FOLDER_NAME);
          formik.setFieldValue('folder', defaultFolder?.id);
          formik.validateForm();

          setPageState(CardStates.CONTENT);
          return;
        }

        setEditMode(true);
        return getArticle(articleId);
      })
      .then((article: IArticle | undefined) => {
        if(!article) return;

        formik.setValues({
          url: article.exactUrl,
          isRedirecting: article.isRedirecting,
          folder: article.folder
        });

        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  const handleFolderSelect = (event: SelectChangeEvent<IArticleFolder>): void => {
    formik.setFieldValue('folder', +event.target.value);
    formik.validateForm();
  }

  return {
    pageState,
    formik,
    folderOptions,
    editMode,
    initForm,
    handleFolderSelect,
    navigateToPreviousPage
  }
}
