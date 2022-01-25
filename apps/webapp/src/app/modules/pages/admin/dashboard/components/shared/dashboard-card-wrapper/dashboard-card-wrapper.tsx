import React from 'react';
import { Typography } from '@mui/material';

import Card from '@shared/components/card';

export default function DashboardCardWrapper(props: any) {
  return <Card styles={{
    minHeight: 'fit-content',
    height: '100%'
  }}>
    <Typography variant='h6'
                gutterBottom
                component='div'
                sx={{
                  fontWeight: 100,
                  textAlign: 'center'
                }}>
      { props.title }
    </Typography>
    { props.children }
  </Card>
}
