import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';

export default function ImageForm(props: any) {
  const {handleChangeFile, handleChangeUrl} = props;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <Box sx={{
        flex: 3
      }}>
        <input
          id='file-button'
          accept='image/*'
          style={{display: 'none'}}
          type='file'
          onChange={handleChangeFile}
        />
        <label htmlFor='file-button'>
          <Button variant='outlined' component='span'>
            Upload photo
          </Button>
        </label>
      </Box>

      <Box sx={{
          flex: 1,
        }}>
        or put
      </Box>

      <TextField fullWidth label='Url link here' sx={{flex: 8}} onChange={handleChangeUrl}/>
    </Box>
  );
}
