import { Box } from '@mui/material';

import { AdminRoutePaths } from '@utils/enums';
import { Card } from '@components/Card';
import { PageHeaderCard } from '@components/PageHeaderCard';

import { BooksTable } from './components/BooksTable';
import { STYLES } from './constants';

export const Books = () =>
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

