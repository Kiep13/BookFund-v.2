import { Box } from '@mui/material';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import Card from '@shared/components/card';
import PageHeaderCard from '@shared/components/page-header-card';

import AuthorsTable from './authors-table';

export default function Authors() {
  return (
    <>
      <Box sx={{
        mb: 3
      }}>
        <PageHeaderCard title={'Authors'} url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`}/>
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

