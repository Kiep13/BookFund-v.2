import { Box } from '@mui/material';

import { AdminRoutePaths } from '@core/enums';
import Card from '@shared/components/card';
import PageHeaderCard from '@shared/components/page-header-card';

import { BooksTable } from './components/books-table';
import { STYLES } from './constants';

export const Books = () => {
  return (
    <>
      <Box sx={STYLES.box}>
        <PageHeaderCard
          title={'Books'}
          url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`}/>
      </Box>

      <Box sx={STYLES.box}>
        <Card>
          <BooksTable/>
        </Card>
      </Box>
    </>
  );
}

