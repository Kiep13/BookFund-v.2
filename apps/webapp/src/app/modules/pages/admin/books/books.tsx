import { Box, Button } from '@mui/material';
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
            <span>Books</span>
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

