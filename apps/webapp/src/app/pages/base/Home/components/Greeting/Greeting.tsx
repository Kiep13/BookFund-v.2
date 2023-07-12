import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { getIsAuthorized, getUser } from '@store/reducers';
import { STYLES } from '../../constants';

export const Greeting = () => {
  const isAuthorized = useSelector(getIsAuthorized);
  const user = useSelector(getUser);

  return <>
    {
      isAuthorized && <Typography variant='h3' gutterBottom component='div' sx={STYLES.greeting}>
        Welcome back, {user?.name}
      </Typography>
    }
  </>
}
