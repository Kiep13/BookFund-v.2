import { Box } from '@mui/material';

import { AdminRoutePaths } from '@core/enums';
import { PageHeaderCard } from '@shared/components/pageHeaderCard';

import { STYLES } from './constants';

export const Collections = () => {
  return (
    <>
      <Box sx={STYLES.box}>
        <PageHeaderCard
          title={'Collections'}
          url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`}/>
      </Box>
    </>
  )
}
