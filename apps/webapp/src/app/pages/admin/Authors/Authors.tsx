import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { Card } from '@components/cards/Card';
import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { AdminRoutePaths } from '@utils/enums';

import { AuthorsTable } from './components/AuthorsTable';
import { STYLES } from './constants';

export const Authors = () =>
  <>
    <Box sx={STYLES.box}>
      <PageHeaderCard title='Authors'>
        <Link to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`}>
          <Button variant='contained'>Add new</Button>
        </Link>
      </PageHeaderCard>
    </Box>

    <Box sx={STYLES.box}>
      <Card>
        <AuthorsTable/>
      </Card>
    </Box>
  </>

