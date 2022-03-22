import { Paper } from '@mui/material';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const Card = ({styles, children}: IProps) =>
  <Paper elevation={3} sx={{
    ...STYLES.wrapper,
    ...(styles ? styles : {})
  }}>
    {children}
  </Paper>

