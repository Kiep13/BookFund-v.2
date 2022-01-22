import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import Card from '@shared/components/card';

import AuthorsTable from './authors-table';

export default function Authors() {
  return (
    <>
      <Box sx={{
        mb: 3
      }}>
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
              Authors
            </Typography>
            <Link to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`}>
              <Button variant='contained'>Add new</Button>
            </Link>
          </Box>
        </Card>
      </Box>

      <Box sx={{
        mb: 1
      }}>
        <Card>
          <AuthorsTable/>
        </Card>
      </Box>
    </>
  );
}

