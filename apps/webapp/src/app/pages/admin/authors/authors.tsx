import { Box } from '@mui/material';

import { Card } from '@components/Card';
import { PageHeaderCard } from '@components/pageHeaderCard';
import { AdminRoutePaths } from '@utils/enums';

import { AuthorsTable } from './components/authorsTable';
import { STYLES } from './constants';

export const Authors = () => {
  return (
    <>
      <Box sx={STYLES.box}>
        <PageHeaderCard
          title={'Authors'}
          url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`}/>
      </Box>

      <Box sx={STYLES.box}>
        <Card>
          <AuthorsTable/>
        </Card>
      </Box>
    </>
  );
}

