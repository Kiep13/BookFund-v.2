import { Typography } from '@mui/material';

import { Card } from '@components/Card';

import { STYLES } from './constants';

export const DashboardCardWrapper = (props: any) =>
  <Card styles={STYLES.wrapper}>
    <Typography
      variant='h6'
      gutterBottom
      component='div'
      sx={STYLES.header}>
      {props.title}
    </Typography>
    {props.children}
  </Card>
