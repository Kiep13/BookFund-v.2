import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik/dist/types';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { IAuthor, IFormPageParams } from '@core/interfaces';
import { ImageUpload } from '@features/imageUpload';
import { State, StatefulCard } from '@features/statefulCard';
import { useAlerts } from '@features/alertsBlock/hooks';
import { Card } from '@shared/components/card';
import { Input } from '@shared/components/formСomponents/input';
import { useApi } from '@shared/hooks';

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
  const history = useHistory();
  const params = useParams();
  const api = useApi();
  const {addSuccess, addError} = useAlerts();

  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [editMode, setEditMode] = useState<boolean>(false);

  const callSubmitAction = (values: IAuthorForm) => {
    const authorId = (params as IFormPageParams).id;

    return editMode ?
      api.updateAuthor(authorId, values).then(() => {
        addSuccess(SUCCESSFULLY_UPDATED)
      }) :
      api.addAuthor(values).then(() => {
        addSuccess(SUCCESSFULLY_ADDED)
      });
  }

  const handleSubmit = async (values: IAuthorForm, {setSubmitting}: FormikHelpers<IAuthorForm>) => {
    if (values.imageFile) {
      const formData = new FormData();
      formData.append('image', values.imageFile);

      values.imageUrl = await (await api.saveImage(formData));
    }

    callSubmitAction(values)
      .then(() => {
        navigateToAuthorsPage();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR)
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  const navigateToAuthorsPage = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`);
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const setEditFormValues = async () => {
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
        addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
      });
  }

  useEffect(() => {
    setEditFormValues();
  }, []);

  return (<Card>
    <Box sx={STYLES.page}>
      <Typography
        variant='h5'
        gutterBottom
        sx={STYLES.pageHeader}>
        {editMode ? TITLE_EDIT : TITLE_ADD}
      </Typography>

      <StatefulCard state={pageState}>
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
              onClick={navigateToAuthorsPage}>
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
