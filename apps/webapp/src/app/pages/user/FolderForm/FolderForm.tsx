import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

import { Card } from '@components/cards/Card';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Input } from '@components/formСomponents/Input';

import { STYLES, TITLE_ADD, TITLE_EDIT } from './constants';
import { useFolderForm } from './useFolderForm';

export const FolderForm = () => {
  const {
    pageState,
    formik,
    editMode,
    initForm,
    handleCancelClick,
  } = useFolderForm();

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
            component='div'
            sx={STYLES.pageHeader}>
            {editMode ? TITLE_EDIT : TITLE_ADD}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Input
              id='name'
              label='Name'
              fieldName='name'
              form={formik}
              styles={STYLES.nameInput}
            />
            <Box sx={STYLES.formButtons}>
              <Button
                variant='outlined'
                sx={STYLES.cancelButton}
                onClick={handleCancelClick}>
                Cancel
              </Button>

              <Button
                variant='contained'
                type='submit'
                disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}
              >
                Save
              </Button>
            </Box>

          </form>
        </StatefulCard>
      </Box>
    </Card>
  )
}

