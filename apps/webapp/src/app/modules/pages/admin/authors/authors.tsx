import { Box } from '@mui/material';

import { AdminRoutePaths } from '@core/enums';
import { Card } from '@shared/components/card';
import { PageHeaderCard } from '@shared/components/page-header-card';

import { AuthorsTable } from './components/authors-table';
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

