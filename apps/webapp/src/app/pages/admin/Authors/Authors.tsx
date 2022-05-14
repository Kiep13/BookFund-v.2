import { Box } from '@mui/material';

import { Card } from '@components/cards/Card';
import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { AdminRoutePaths } from '@utils/enums';

import { AuthorsTable } from './components/AuthorsTable';
import { STYLES } from './constants';

export const Authors = () =>
  <>
    <Box sx={STYLES.box}>
      <PageHeaderCard
        title='Authors'
        url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`}/>
    </Box>

    <Box sx={STYLES.box}>
      <Card>
        <AuthorsTable/>
      </Card>
    </Box>
  </>

