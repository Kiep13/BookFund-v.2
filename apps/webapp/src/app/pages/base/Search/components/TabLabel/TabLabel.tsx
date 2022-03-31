import { Box, Chip, Typography } from '@mui/material';

import { STYLES_TAB_LABEL } from '../../constants';
import { IProps } from './propsInterface';

export const TabLabel = ({label, value}: IProps) =>
  <Box sx={STYLES_TAB_LABEL.tabLabel}>
    <Typography component='legend'>{ label }</Typography>
    <Chip label={value} size='small' color='primary'/>
  </Box>
