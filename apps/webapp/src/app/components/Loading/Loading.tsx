import { Box, CircularProgress, Typography } from '@mui/material';

import { DEFAULT_TITLE, STYLES } from './constants';
import { IProps } from './propsInterface';

export const Loading = ({ title = DEFAULT_TITLE }: IProps) =>
  <Box sx={STYLES.page}>
    <Box sx={STYLES.content}>
      <CircularProgress size={150}/>
      <Typography variant='h2' gutterBottom component='div'>
        {title}
      </Typography>
    </Box>
  </Box>
