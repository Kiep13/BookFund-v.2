import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ImageUpload } from '@components/ImageUpload';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Card } from '@components/cards/Card';
import { Input } from '@components/formСomponents/Input';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, ICollection, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useCollectionActions } from '@utils/hooks';

import { ICollectionForm } from './interfaces';
import { BookSelection } from './components/BookSelection';
import {
  FORM_INITIAL_VALUE,
  STYLES,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  TITLE_ADD,
  TITLE_EDIT,
  VALIDATION_SCHEMA
} from './constants';

export const CollectionForm = () => {
  const params = useParams();
  const api = useApi();
  const alerts = useAlerts();
  const collectionActions = useCollectionActions();

  const [pageState, setPageState] = useState<CardStates>(CardStates.CONTENT);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: ICollectionForm) => {
    const collectionId = (params as IFormPageParams).id;

    return editMode ?
      api.updateCollection(collectionId, values).then(() => {
        alerts.addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      api.addCollection(values).then(() => {
        alerts.addSuccess(SUCCESSFULLY_ADDED);
      })
  }

  const handleSubmit = async (values: ICollectionForm, {setSubmitting}: FormikHelpers<ICollectionForm>) => {
    try {
      if (values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await (await api.saveImage(formData));
      }

      await callSubmitAction(values);
      collectionActions.navigateToAdminCollectionsPage();
    } catch (e) {
      alerts.addError(API_TOOLTIP_ERROR);
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

    if(!collectionId) {
      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    api.getCollection(collectionId)
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
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    initForm();
  }, []);

  return <Card>
    <Box sx={STYLES.page}>
      <StatefulCard state={pageState}>
        <Typography
          variant='h5'
          gutterBottom
          component='div'
          sx={STYLES.pageHeader}>
          {editMode ? TITLE_EDIT : TITLE_ADD}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Input
            id={'title'}
            label={'Title'}
            fieldName={'title'}
            form={formik}
            styles={STYLES.titleInput}/>

          <Input
            id={'subtitle'}
            label={'Subtitle'}
            fieldName={'subtitle'}
            form={formik}
            styles={STYLES.subtitleInput}/>

          <Box sx={STYLES.imageWrapper}>
            <ImageUpload
              form={formik}
              imageUrlFieldName={'imageUrl'}
              imageFileFieldName={'imageFile'}/>
          </Box>

          <Input
            id={'description'}
            label={'Description'}
            fieldName={'description'}
            form={formik}
            multiline
            maxRows={10}
            styles={STYLES.descriptionInput}/>

          <Box sx={STYLES.bookSelection}>
            <BookSelection
              form={formik}
              autocompleteFieldName={'bookAutocomplete'}
              dataFieldName={'books'}
            />
          </Box>

          <Box sx={STYLES.formButtons}>
            <Button
              variant='outlined'
              sx={STYLES.cancelButton}
              onClick={collectionActions.navigateToAdminCollectionsPage}>
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
