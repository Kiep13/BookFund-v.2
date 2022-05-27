import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as pdfjs from 'pdfjs-dist';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { environment } from '@environments/environment';

import {
  FORM_INITIAL_VALUE,
  VALIDATION_SCHEMA,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED
} from './constants';
import { IBookForm } from './interfaces';

export const useBookForm = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const params = useParams();
  const {getBook, addBook, updateBook, saveImage, saveFile} = useApi();
  const {addError, addSuccess} = useAlerts();
  const {navigateToAdminBooksPage} = useBookActions();

  const callSubmitAction = (values: IBookForm) => {
    const bookId = (params as IFormPageParams).id;

    return editMode ?
      updateBook(bookId, values).then(() => {
        addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      addBook(values).then(() => {
        addSuccess(SUCCESSFULLY_ADDED);
      });
  }

  const handleSubmit = async (values: IBookForm, {setSubmitting}: FormikHelpers<IBookForm>) => {
    try {
      if (values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await saveImage(formData);
      }

      if (values.file) {
        const formData = new FormData();
        formData.append('file', values.file);

        values.fileUrl = await saveFile(formData);

        const documentInfo = await pdfjs.getDocument(`${environment.backEndUrl}${values.fileUrl}`).promise;
        values.amountPages = documentInfo.numPages;
      }

      await callSubmitAction(values);
      navigateToAdminBooksPage();
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

  const initForm = () => {
    const bookId = (params as IFormPageParams).id;

    if (!bookId) {
      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    getBook(bookId)
      .then((book: IBook) => {
        book.author.title = `${book.author?.name} ${book.author?.surname}`;

        formik.setValues({
          ...book,
          description: book.description || '',
          imageUrl: book.image,
          genres: book.genres || [],
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
    navigateToAdminBooksPage
  }
}
