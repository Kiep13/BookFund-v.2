import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

import { ImageUpload } from '@components/formСomponents/ImageUpload';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Card } from '@components/cards/Card';
import { Input } from '@components/formСomponents/Input';

import { BookSelection } from './components/BookSelection';
import {
  STYLES,
  TITLE_ADD,
  TITLE_EDIT,
} from './constants';
import { useCollectionForm } from './useCollectionForm';

export const CollectionForm = () => {
  const {
    formik,
    editMode,
    pageState,
    initForm,
    navigateToAdminCollectionsPage
  } = useCollectionForm();

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
            id='title'
            label='Title'
            fieldName='title'
            form={formik}
            styles={STYLES.titleInput}
          />

          <Input
            id='subtitle'
            label='Subtitle'
            fieldName='subtitle'
            form={formik}
            styles={STYLES.subtitleInput}
          />

          <Box sx={STYLES.imageWrapper}>
            <ImageUpload
              form={formik}
              imageUrlFieldName='imageUrl'
              imageFileFieldName='imageFile'
            />
          </Box>

          <Input
            id='description'
            label='Description'
            fieldName='description'
            form={formik}
            multiline
            maxRows={10}
            styles={STYLES.descriptionInput}
          />

          <Box sx={STYLES.bookSelection}>
            <BookSelection
              form={formik}
              autocompleteFieldName='bookAutocomplete'
              dataFieldName='books'
            />
          </Box>

          <Box sx={STYLES.formButtons}>
            <Button
              variant='outlined'
              sx={STYLES.cancelButton}
              onClick={navigateToAdminCollectionsPage}>
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
