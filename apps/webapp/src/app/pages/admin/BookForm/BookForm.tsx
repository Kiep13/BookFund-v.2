import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

import { FileUpload } from '@components/formСomponents/FileUpload';
import { ImageUpload } from '@components/formСomponents/ImageUpload';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Input } from '@components/formСomponents/Input';
import { Card } from '@components/cards/Card';

import { AuthorAutocomplete, GenresMultiAutocomplete } from './components';
import {
  STYLES,
  TITLE_ADD,
  TITLE_EDIT
} from './constants';
import { useBookForm } from './useBookForm';

export const BookForm = () => {
  const {
    formik,
    editMode,
    pageState,
    initForm,
    navigateToAdminBooksPage
  } = useBookForm();

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

          <Box sx={STYLES.authorWrapper}>
            <AuthorAutocomplete form={formik} fieldName='author'/>
          </Box>

          <Input
            id='year'
            label='Year'
            fieldName='year'
            form={formik}
            styles={STYLES.yearInput}
          />

          <Box sx={STYLES.genresWrapper}>
            <GenresMultiAutocomplete form={formik} fieldName='genres'/>
          </Box>

          <Box sx={STYLES.imageWrapper}>
            <ImageUpload
              form={formik}
              imageUrlFieldName='imageUrl'
              imageFileFieldName='imageFile'
            />
          </Box>

          <Box sx={STYLES.fileWrapper}>
            <FileUpload
              form={formik}
              fileNameFieldName='fileName'
              fileFieldName='file'
            />
          </Box>

          <Input
            id='description'
            label='Description'
            fieldName='description'
            form={formik}
            multiline
            maxRows={10}
            styles={STYLES.descriptionInput}/>

          <Box sx={STYLES.formButtons}>
            <Button
              variant='outlined'
              sx={STYLES.cancelButton}
              onClick={navigateToAdminBooksPage}>
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
