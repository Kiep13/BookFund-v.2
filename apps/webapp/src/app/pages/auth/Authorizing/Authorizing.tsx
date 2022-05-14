import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react';

import { AuthRoutePaths } from '@utils/enums';

import { STYLES } from './constants';
import { useAuthorizing } from './useAuthorizing';

export const Authorizing = () => {
  const {sendRefreshRequest, sendLoginRequest} = useAuthorizing();

  useEffect(() => {
    if (location.pathname === AuthRoutePaths.REFRESH) {
      sendRefreshRequest();
    } else {
      sendLoginRequest();
    }
  }, []);

  return (
    <Box sx={STYLES.page}>
      <Box sx={STYLES.content}>
        <CircularProgress size={150}/>
        <Typography variant='h2' gutterBottom component='div'>
          Loading
        </Typography>
      </Box>
    </Box>
  )
}
