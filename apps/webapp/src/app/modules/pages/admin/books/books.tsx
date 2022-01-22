import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';

import Card from '@shared/components/card';

import BooksTable from './books-table';

export default function Books() {
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
              Books
            </Typography>
            <Button variant='contained'>Add new</Button>
          </Box>
        </Card>
      </Box>

      <Box sx={{
        mb: 1
      }}>
        <Card>
          <BooksTable/>
        </Card>
      </Box>
    </>
  );
}

