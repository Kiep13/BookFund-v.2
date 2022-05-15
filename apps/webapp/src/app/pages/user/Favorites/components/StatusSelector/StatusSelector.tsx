import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { BookStatuses } from '@utils/enums';

import { ALL_VALUE } from '../../constants';
import { IProps } from './propsInterface';

export const StatusSelector = ({ value, setValue }: IProps) => {
  const handleChange = (event: SelectChangeEvent): void => {
    setValue(event.target.value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select
        value={value}
        label='Status'
        onChange={handleChange}
      >
        <MenuItem value={ALL_VALUE}>All</MenuItem>
        <MenuItem value={BookStatuses.WANT_TO_READ}>Want to read</MenuItem>
        <MenuItem value={BookStatuses.IN_PROGRESS}>Reading</MenuItem>
        <MenuItem value={BookStatuses.DONE}>Done</MenuItem>
      </Select>
    </FormControl>
  )
}
