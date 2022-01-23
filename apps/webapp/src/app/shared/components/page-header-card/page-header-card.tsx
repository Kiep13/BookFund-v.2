import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Card from '@shared/components/card';

export default function PageHeaderCard(props: any) {
  const { title, url } = props;

  return (
    <Card>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant='h5'
                    gutterBottom
                    component='div'
                    sx={{
                      fontWeight: 100,
                      m: 0
                    }}>
          { title }
        </Typography>
        <Link to={url}>
          <Button variant='contained'>Add new</Button>
        </Link>
      </Box>
    </Card>
  )
}
