import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { AdminRoutePaths } from '@utils/enums';
import { Card } from '@components/cards/Card';
import { PageHeaderCard } from '@components/headers/PageHeaderCard';

import { BooksTable } from './components/BooksTable';
import { STYLES } from './constants';

export const Books = () =>
  <>
    <Box sx={STYLES.box}>
      <PageHeaderCard title='Books'>
        <Link to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`}>
          <Button variant='contained'>Add new</Button>
        </Link>
      </PageHeaderCard>
    </Box>

    <Box sx={STYLES.box}>
      <Card>
        <BooksTable/>
      </Card>
    </Box>
  </>

