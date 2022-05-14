import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

import { ImageUpload } from '@components/formСomponents/ImageUpload';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Card } from '@components/cards/Card';
import { Input } from '@components/formСomponents/Input';

import { STYLES, TITLE_ADD, TITLE_EDIT } from './constants';
import { useAuthorForm } from './useAuthorForm';

export const AuthorForm = () => {
  const {
    formik,
    editMode,
    pageState,
    initForm,
    navigateToAdminAuthorsPage
  } = useAuthorForm();

  useEffect(() => {
    initForm();
  }, []);

  return (
    <Card>
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
                id='name'
                label='Name'
                fieldName='name'
                form={formik}
                styles={STYLES.nameInput}
              />

              <Input
                id='surname'
                label='Surname'
                fieldName='surname'
                form={formik}
                styles={STYLES.nameInput}
              />
            </Box>


            <Box sx={STYLES.imageUploadWrapper}>
              <ImageUpload
                form={formik}
                imageUrlFieldName='imageUrl'
                imageFileFieldName='imageFile'
              />
            </Box>

            <Input
              id='biography'
              label='Biography'
              fieldName='biography'
              form={formik}
              multiline
              maxRows={10}
              styles={STYLES.biographyInput}
            />

            <Box sx={STYLES.formButtons}>
              <Button
                variant='outlined'
                sx={STYLES.cancelButton}
                onClick={navigateToAdminAuthorsPage}>
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
  )
}
