import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { IBook, IFormPageParams } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock/hooks';
import { ImageUpload } from '@features/imageUpload';
import { State, StatefulCard } from '@features/statefulCard';
import { Input } from '@shared/components/formСomponents/input';
import { Card } from '@shared/components/card';
import { useApi } from '@shared/hooks';

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
  const history = useHistory();
  const params = useParams();
  const api = useApi();
  const {addSuccess, addError} = useAlerts();

  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: IBookForm) => {
    const bookId = (params as IFormPageParams).id;

    return editMode ?
      api.updateBook(bookId, values).then(() => {
        addSuccess(SUCCESSFULLY_UPDATED);
      }) :
      api.addBook(values).then(() => {
        addSuccess(SUCCESSFULLY_ADDED);
      });
  }

  const handleSubmit = async (values: IBookForm, {setSubmitting}: FormikHelpers<IBookForm>) => {
    if(values.imageFile) {
      const formData = new FormData();
      formData.append('image', values.imageFile);

      values.imageUrl = await(await api.saveImage(formData));
    }

    await callSubmitAction(values)
      .then(() => {
        navigateToBooksPage();
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

  const navigateToBooksPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`);
  }

  const initForm = () => {
    const bookId = (params as IFormPageParams).id;

    if(!bookId) {
      setPageState(State.CONTENT);
      return;
    }

    setEditMode(true);
    api.getBook(bookId)
      .then((book: IBook) => {
        book.author.name = `${book.author?.name} ${book.author?.surname}`;

        formik.setValues({
          ...book,
          description: book.description || '',
          imageUrl: book.image,
          genres: book.genres || [],
        });

        setPageState(State.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
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
              alt={`Book's cover`}
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
              onClick={navigateToBooksPage}>
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
