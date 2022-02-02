import { Box, Button, TextField, Typography } from '@mui/material';
import * as React from 'react';

import { IGenre, IOption } from '@core/interfaces';
import { GENRES_MOCK } from '@mocks/genres.mock';
import AutocompleteInput from '@shared/components/form-components/autocomplete-input';
import Card from '@shared/components/card';

export default function GenreForm() {
  const genresOptions: IOption[] = GENRES_MOCK.map((genre: IGenre) => {
    return {
      title: genre.name,
      id: genre.id
    }
  })

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
        Add new genre
      </Typography>

      <form>
        <TextField label='Name' sx={{
          mb: 3,
          width: '100%'
        }}/>

        <Box sx={{
          mb: 3
        }}>
          <AutocompleteInput options={genresOptions} label={'Genre'}/>
        </Box>


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
