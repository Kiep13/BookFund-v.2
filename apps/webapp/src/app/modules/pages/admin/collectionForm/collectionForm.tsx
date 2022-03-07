import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AdminRoutePaths } from '@core/enums';
import { useAlerts } from '@features/alertsBlock/hooks';
import { ImageUpload } from '@features/imageUpload';
import { State, StatefulCard } from '@features/statefulCard';
import { ICollectionForm } from '@pages/admin/collectionForm/interfaces';
import { Card } from '@shared/components/card';
import { Input } from '@shared/components/formСomponents/input';
import { useApi } from '@shared/hooks';

import { FORM_INITIAL_VALUE, STYLES, TITLE_ADD, TITLE_EDIT, VALIDATION_SCHEMA } from './constants';

export const CollectionForm = () => {
  const history = useHistory();
  const params = useParams();
  const api = useApi();
  const {addSuccess, addError} = useAlerts();

  const [pageState, setPageState] = useState<State>(State.CONTENT);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSubmit = async (values: ICollectionForm, {setSubmitting}: FormikHelpers<ICollectionForm>) => {

  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const navigateToCollectionsPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`);
  }

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

          <Box sx={STYLES.imageWrapper}>
            <ImageUpload
              alt={`Background image`}
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
              onClick={navigateToCollectionsPage}>
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
