import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { AdminRoutePaths } from '@utils/enums';

import { CollectionsContent } from './components/CollectionsContent';
import { STYLES } from './constants';

export const Collections = () =>
  <>
    <Box sx={STYLES.header}>
      <PageHeaderCard title='Collections'>
        <Link to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`}>
          <Button variant='contained'>Add new</Button>
        </Link>
      </PageHeaderCard>
    </Box>

    <Box sx={STYLES.content}>
      <CollectionsContent/>
    </Box>
  </>
