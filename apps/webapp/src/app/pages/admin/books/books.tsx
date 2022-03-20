import { Box } from '@mui/material';

import { AdminRoutePaths } from '@utils/enums';
import { Card } from '@components/card';
import { PageHeaderCard } from '@components/pageHeaderCard';

import { BooksTable } from './components/booksTable';
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

