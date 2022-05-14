import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, ICollection, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useCollectionActions } from '@utils/hooks';

import { ICollectionForm } from './interfaces';
import {
  FORM_INITIAL_VALUE,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  VALIDATION_SCHEMA
} from './constants';

export const useCollectionForm = () => {
  const params = useParams();
  const {getCollection, addCollection, updateCollection, saveImage} = useApi();
  const {addError, addSuccess} = useAlerts();
  const {navigateToAdminCollectionsPage} = useCollectionActions();

  const [pageState, setPageState] = useState<CardStates>(CardStates.CONTENT);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: ICollectionForm) => {
    const collectionId = (params as IFormPageParams).id;

    return editMode ?
      updateCollection(collectionId, values).then(() => {
        addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      addCollection(values).then(() => {
        addSuccess(SUCCESSFULLY_ADDED);
      })
  }

  const handleSubmit = async (values: ICollectionForm, {setSubmitting}: FormikHelpers<ICollectionForm>) => {
    try {
      if (values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await (await saveImage(formData));
      }

      await callSubmitAction(values);
      navigateToAdminCollectionsPage();
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
    const collectionId = (params as IFormPageParams).id;

    if (!collectionId) {
      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    getCollection(collectionId)
      .then((collection: ICollection) => {
        collection.books.forEach((book: IBook) => {
          book.authorFullName = `${book.author.name} ${book.author.surname}`;
        });

        formik.setValues({
          ...collection,
          description: collection.description,
          imageUrl: collection.image,
          books: collection.books || []
        });

        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

  return {
    formik,
    editMode,
    pageState,
    initForm,
    navigateToAdminCollectionsPage
  }
}
