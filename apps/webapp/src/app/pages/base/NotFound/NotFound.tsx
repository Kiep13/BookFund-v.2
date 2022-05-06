import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { BaseRoutePaths } from '@utils/enums';

import { STYLES } from './constants';

export const NotFound = () =>
  <Box sx={STYLES.page}>
    <Typography variant='h1' component='div' gutterBottom>Page Not Found</Typography>
    <Box sx={STYLES.explanation}>
      <Typography variant='body1' gutterBottom>The page you were looking for could not be found.</Typography>
      <Typography variant='body1' gutterBottom>It might have been removed, renamed, or did not exist in the first place.</Typography>
    </Box>
    <Box sx={STYLES.buttonsWrapper}>
      <Link to={BaseRoutePaths.HOME}>
        <Button variant='outlined'>Back Home</Button>
      </Link>
    </Box>
  </Box>
