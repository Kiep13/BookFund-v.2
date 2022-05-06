import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';

import { STYLES } from '../../constants';
import { PageViews } from '../../enums';
import { IProps } from './propsInterface';

export const PageViewSelector = ({pageView, handlePageViewChange}: IProps) => {
  const handleChange = (event: SelectChangeEvent<PageViews>): void => {
    handlePageViewChange(event.target.value);
  };

  return (
    <FormControl sx={STYLES.header.selector} size='small'>
      <InputLabel id='page-view-selector'>Page View</InputLabel>
      <Select
        labelId='page-view-selector'
        id='page-view-selector'
        value={pageView}
        label='Page View'
        onChange={handleChange}
      >
        <MenuItem value={PageViews.SinglePage}>Single Page</MenuItem>
        <MenuItem value={PageViews.TwoPage}>Two Page</MenuItem>
      </Select>
    </FormControl>
  );
}
