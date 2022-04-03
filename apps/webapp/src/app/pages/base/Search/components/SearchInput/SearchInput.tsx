import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useState, KeyboardEvent } from 'react';

import { ENTER_CODE, STYLES_SEARCH_INPUT } from '../../constants';
import { IProps } from './propsInterface';

export const SearchInput = ({ searchTerm, handleSubmit }: IProps) => {
  const [value, setValue] = useState<string>(searchTerm);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if(event.code !== ENTER_CODE || !value) {
      return;
    }

    handleSubmit(value);
  }

  const handleEnter = () => {
    if(!value) {
      return;
    }

    handleSubmit(value);
  }

  return (
    <Box sx={STYLES_SEARCH_INPUT.wrapper}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchTwoToneIcon/>
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={STYLES_SEARCH_INPUT.input}
        size={'small'}
        fullWidth
        placeholder={'Search'}
      />
      <Button variant='contained' onClick={() => handleEnter()}>Submit</Button>
    </Box>
  )
}

