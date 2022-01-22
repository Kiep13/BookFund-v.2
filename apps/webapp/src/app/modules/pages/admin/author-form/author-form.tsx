import { Box, Button, TextField, Typography } from '@mui/material';

import ImageUpload from '@features/image-upload';
import Card from '@shared/components/card';

export default function AuthorForm() {
  return <Card>
    <Box sx={{
      maxWidth: 600,
      m: 'auto',
      minHeight: 'calc(100vh - 170px)',
      height: 'fit-content'
    }}>
      <Typography variant='h5'
                  gutterBottom
                  component='div'
                  sx={{
                    fontWeight: 100,
                    textAlign: 'center',
                    mb: 5
                  }}>
        Add new author
      </Typography>

      <form>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          mb: 3
        }}>
          <TextField label='Name' sx={{
            flex: 1
          }}/>
          <TextField label='Surname' sx={{
            flex: 1
          }}/>
        </Box>


        <Box sx={{
          mb: 3
        }}>
          <ImageUpload/>
        </Box>

        <TextField
          label='Biography'
          multiline
          maxRows={10}
          sx={{
            mb: 3,
            width: '100%'
          }}
        />

        <Box sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button variant='outlined' sx={{mr: 2}}>Cancel</Button>
          <Button variant='contained'>Save</Button>
        </Box>

      </form>
    </Box>

  </Card>
}
