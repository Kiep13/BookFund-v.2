import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { InputAdornment, TextField } from '@mui/material';

import { STYLES } from './constants';

export const SearchInput = () => {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchTwoToneIcon/>
          </InputAdornment>
        ),
      }}
      sx={STYLES.textField}
      placeholder={'Search'}
    />
  )
}
