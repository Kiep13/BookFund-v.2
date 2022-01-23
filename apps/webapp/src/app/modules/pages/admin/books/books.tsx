import { Box } from '@mui/material';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import Card from '@shared/components/card';
import PageHeaderCard from '@shared/components/page-header-card';

import BooksTable from './books-table';

export default function Books() {
  return (
    <>
      <Box sx={{
        mb: 3
      }}>
        <PageHeaderCard title={'Books'} url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`}/>
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

