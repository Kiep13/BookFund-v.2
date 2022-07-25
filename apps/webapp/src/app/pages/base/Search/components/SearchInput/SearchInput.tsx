import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { MAX_SEARCH_LENGTH_INPUT, STYLES_SEARCH_INPUT } from '../../constants';
import { IProps } from './propsInterface';
import { useSearchInput } from './useSearchInput';

export const SearchInput = ({ searchTerm, handleSubmit }: IProps) => {
  const {
    value,
    handleChange,
    handleKeyDown,
    handleEnter
  } = useSearchInput(searchTerm, handleSubmit);

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
        inputProps={{
          maxLength: MAX_SEARCH_LENGTH_INPUT
        }}
        value={value}
        helperText={<Typography variant='caption' sx={STYLES_SEARCH_INPUT.hint}>{value.length}/{MAX_SEARCH_LENGTH_INPUT}</Typography>}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={STYLES_SEARCH_INPUT.input}
        size='small'
        fullWidth
        placeholder='Search'
      />
      <Button variant='contained' onClick={handleEnter}>Submit</Button>
    </Box>
  )
}

