import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export function SearchInput() {
  return (
    <TextField
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position='end'>
            <SearchTwoToneIcon/>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiInputBase-input': {
          outline: 0,
          height: 25,
          width: 220,
          padding: '10px'
        },
        '& .Mui-focused': {
          outline: 0,
          boxShadow: '0 0 0 0.2rem #80BDFF',
          borderColor: '#80BDFF',
          borderRadius: '4px'
        }
      }}
      placeholder={'Search'}
    />
  )
}
