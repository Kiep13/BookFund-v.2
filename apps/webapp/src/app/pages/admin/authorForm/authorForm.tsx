import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { ImageUpload } from '@components/imageUpload';
import { State, StatefulCard } from '@components/statefulCard';
import { Card } from '@components/Card';
import { Input } from '@components/formСomponents/Input';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { IAuthor, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';

import {
  FORM_INITIAL_VALUE,
  STYLES, SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  TITLE_ADD,
  TITLE_EDIT,
  VALIDATION_SCHEMA
} from './constants';
import { IAuthorForm } from './interfaces';

export const AuthorForm = () => {
  const params = useParams();
  const api = useApi();
  const alerts = useAlerts();
  const authorActions = useAuthorActions();

  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: IAuthorForm) => {
    const authorId = (params as IFormPageParams).id;

    return editMode ?
      api.updateAuthor(authorId, values).then(() => {
        alerts.addSuccess(SUCCESSFULLY_UPDATED)
      }) :
      api.addAuthor(values).then(() => {
        alerts.addSuccess(SUCCESSFULLY_ADDED)
      });
  }

  const handleSubmit = async (values: IAuthorForm, {setSubmitting}: FormikHelpers<IAuthorForm>) => {
    try {
      if (values.imageFile) {
        const formData = new FormData();
        formData.append('image', values.imageFile);

        values.imageUrl = await (await api.saveImage(formData));
      }

      await callSubmitAction(values);
      authorActions.navigateToAuthorsPage();
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

  const initForm = async () => {
    const authorId = (params as IFormPageParams).id;

    if (!authorId) {
      setPageState(State.CONTENT);
      return;
    }

    setEditMode(true);
    await api.getAuthor(authorId)
      .then((author: IAuthor) => {
        formik.setValues({
          ...author,
          biography: author.biography || '',
          imageUrl: author.image
        });

        setPageState(State.CONTENT)
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
      });
  }

  useEffect(() => {
    initForm();
  }, []);

  return (<Card>
    <Box sx={STYLES.page}>
      <StatefulCard state={pageState}>
        <Typography
          variant='h5'
          gutterBottom
          sx={STYLES.pageHeader}>
          {editMode ? TITLE_EDIT : TITLE_ADD}
        </Typography>
        <form onSubmit={formik.handleSubmit}>

          <Box sx={STYLES.nameInputsWrapper}>
            <Input
              id={'name'}
              label={'Name'}
              fieldName={'name'}
              form={formik}
              styles={STYLES.nameInput}/>

            <Input
              id={'surname'}
              label={'Surname'}
              fieldName={'surname'}
              form={formik}
              styles={STYLES.nameInput}/>
          </Box>


          <Box sx={STYLES.imageUploadWrapper}>
            <ImageUpload
              alt={`Author's photo`}
              form={formik}
              imageUrlFieldName={'imageUrl'}
              imageFileFieldName={'imageFile'}/>
          </Box>

          <Input
            id={'biography'}
            label={'Biography'}
            fieldName={'biography'}
            form={formik}
            multiline
            maxRows={10}
            styles={STYLES.biographyInput}/>

          <Box sx={STYLES.formButtons}>
            <Button
              variant='outlined'
              sx={STYLES.cancelButton}
              onClick={authorActions.navigateToAuthorsPage}>
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
  </Card>)
}
