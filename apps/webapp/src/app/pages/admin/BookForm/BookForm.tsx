import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as pdfjs from 'pdfjs-dist';

import { FileUpload } from '@components/formСomponents/FileUpload';
import { ImageUpload } from '@components/formСomponents/ImageUpload';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Input } from '@components/formСomponents/Input';
import { Card } from '@components/cards/Card';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { environment } from '@environments/environment';

import { AuthorAutocomplete, GenresMultiAutocomplete } from './components';
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
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const params = useParams();
  const api = useApi();
  const alerts = useAlerts();
  const bookActions = useBookActions();

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
      if (values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await api.saveImage(formData);
      }

      if (values.file) {
        const formData = new FormData();
        formData.append('file', values.file);

        values.fileUrl = await api.saveFile(formData);

        const documentInfo = await pdfjs.getDocument(`${environment.backEndUrl}${values.fileUrl}`).promise;
        values.amountPages = documentInfo.numPages;
      }

      await callSubmitAction(values);
      bookActions.navigateToAdminBooksPage();
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
    const bookId = (params as IFormPageParams).id;

    if (!bookId) {
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

          <Box sx={STYLES.authorWrapper}>
            <AuthorAutocomplete form={formik} fieldName={'author'}/>
          </Box>

          <Input
            id={'year'}
            label={'Year'}
            fieldName={'year'}
            form={formik}
            styles={STYLES.yearInput}/>

          <Box sx={STYLES.genresWrapper}>
            <GenresMultiAutocomplete form={formik} fieldName={'genres'}/>
          </Box>

          <Box sx={STYLES.imageWrapper}>
            <ImageUpload
              form={formik}
              imageUrlFieldName={'imageUrl'}
              imageFileFieldName={'imageFile'}
            />
          </Box>

          <Box sx={STYLES.fileWrapper}>
            <FileUpload
              form={formik}
              fileNameFieldName={'fileName'}
              fileFieldName={'file'}
            />
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
              onClick={bookActions.navigateToAdminBooksPage}>
              Cancel
            </Button>

            <Button
              variant='contained'
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}>
              Save
            </Button>
          </Box>

        </form>
      </StatefulCard>
    </Box>
  </Card>
}
