import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ImageUpload } from '@components/ImageUpload';
import { StatefulCard } from '@components/StatefulCard';
import { Input } from '@components/formСomponents/Input';
import { Card } from '@components/Card';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';

import { AuthorAutocomplete } from './components/authorAutocomplete';
import { GenresMultiAutocomplete } from './components/genresMultiAutocomplete';
import {
  STYLES,
  FORM_INITIAL_VALUE,
  VALIDATION_SCHEMA,
  TITLE_ADD,
  TITLE_EDIT,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED
} from './constants';
import { IBookForm } from './interfaces';

export const BookForm = () => {
  const params = useParams();
  const api = useApi();
  const alerts = useAlerts();
  const bookActions = useBookActions();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: IBookForm) => {
    const bookId = (params as IFormPageParams).id;

    return editMode ?
      api.updateBook(bookId, values).then(() => {
        alerts.addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      api.addBook(values).then(() => {
        alerts.addSuccess(SUCCESSFULLY_ADDED);
      });
  }

  const handleSubmit = async (values: IBookForm, {setSubmitting}: FormikHelpers<IBookForm>) => {
    try {
      if(values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await(await api.saveImage(formData));
      }

      await callSubmitAction(values);
      bookActions.navigateToBooksPage();
    } catch(e) {
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
    const bookId = (params as IFormPageParams).id;

    if(!bookId) {
      setPageState(CardStates.CONTENT);
      return;
    }

    setEditMode(true);
    api.getBook(bookId)
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
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    initForm();
  }, [])

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

          <Box sx={STYLES.authorWrapper}>
            <AuthorAutocomplete form={formik} fieldName={'author'}/>
          </Box>

          <Box sx={STYLES.rowWrapper}>
            <Input
              id={'amountPages'}
              label={'Amount of pages'}
              fieldName={'amountPages'}
              form={formik}
              styles={STYLES.amountPagesInput}/>

            <Input
              id={'year'}
              label={'Year'}
              fieldName={'year'}
              form={formik}
              styles={STYLES.yearInput}/>
          </Box>

          <Box sx={STYLES.genresWrapper}>
            <GenresMultiAutocomplete form={formik} fieldName={'genres'}/>
          </Box>

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

          <Box sx={STYLES.formButtons}>
            <Button
              variant='outlined'
              sx={STYLES.cancelButton}
              onClick={bookActions.navigateToBooksPage}>
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
