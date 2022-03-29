import { InputAdornment, TextField } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { STYLES } from '../../constants';

export const SearchInput = () =>
  <TextField
    InputProps={{
      endAdornment: (
        <InputAdornment position='end'>
          <SearchTwoToneIcon/>
        </InputAdornment>
      ),
    }}
    sx={STYLES.searchTextField}
    fullWidth
    placeholder={'Search'}
  />
