import { InputAdornment, TextField } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useState } from 'react';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const SearchInput = ({ searchTerm }: IProps) => {
  const [value, setValue] = useState<string>(searchTerm);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  }

  return (
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
      sx={STYLES.searchTextField}
      fullWidth
      placeholder={'Search'}
    />
  )
}

