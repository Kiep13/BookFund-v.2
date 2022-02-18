import { Box, Button, TextField, Typography } from '@mui/material';

import ImageUpload from '@features/image-upload';
import Card from '@shared/components/card';

import AuthorSelector from './compnents/author-selector';
import GenresSelector from './compnents/genres-selector';
import { STYLES } from './constants';

export default function BookForm() {
  return <Card>
    <Box sx={STYLES.page}>
      <Typography variant='h5'
                  gutterBottom
                  component='div'
                  sx={STYLES.pageHeader}>
        Add new book
      </Typography>

      <form>
        <TextField label='Title' sx={STYLES.titleInput}/>

        <Box sx={STYLES.authorWrapper}>
          <AuthorSelector/>
        </Box>

        <Box sx={STYLES.rowWrapper}>
          <TextField label='Amount pages' sx={STYLES.amountPagesInput}/>
          <TextField label='Year' sx={STYLES.yearInput}/>
        </Box>

        <Box sx={STYLES.genresWrapper}>
          <GenresSelector/>
        </Box>

        <Box sx={STYLES.imageWrapper}>
          {/*<ImageUpload alt={'Book cover'}/>*/}
        </Box>

        <TextField
          label='Description'
          multiline
          maxRows={10}
          sx={STYLES.descriptionInput}
        />

        <Box sx={STYLES.formButtons}>
          <Button variant='outlined' sx={STYLES.cancelButton}>Cancel</Button>
          <Button variant='contained'>Save</Button>
        </Box>

      </form>
    </Box>

  </Card>
}
