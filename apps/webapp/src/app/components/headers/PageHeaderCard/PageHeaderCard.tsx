import { Box, Typography } from '@mui/material';

import { Card } from '@components/cards/Card';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const PageHeaderCard = ({title, children}: IProps) =>
  <Card>
    <Box sx={STYLES.wrapper}>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={STYLES.title}>
        {title}
      </Typography>
      {
        children
      }
    </Box>
  </Card>
