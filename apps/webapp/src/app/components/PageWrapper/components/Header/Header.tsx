import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthRoutePaths } from '@utils/enums';
import { Logo } from '@components/Logo';
import { SearchInput } from '@components/SearchInput';
import { getIsAuthorized } from '@store/reducers';

import { STYLES_HEADER } from '../../constants';

export const Header = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <Box component='header' sx={STYLES_HEADER.header}>
      <Logo/>
      <Box sx={STYLES_HEADER.rightBlock}>
        <SearchInput/>
        {
          !isAuthorized && <Link to={AuthRoutePaths.LOGIN}>
            <Button variant='outlined' sx={STYLES_HEADER.loginButton}>Login</Button>
          </Link>
        }
      </Box>

    </Box>
  )
}
