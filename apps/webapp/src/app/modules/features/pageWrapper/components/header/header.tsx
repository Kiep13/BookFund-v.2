import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import { Logo } from '@shared/components/logo';
import { SearchInput } from '@shared/components/searchInput';
import { getIsAuthorized } from '@store/reducers';

import { STYLES_HEADER } from '../../constants';
import './header.scss';

export const Header = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <header className='header'>
      <Logo/>
      <Box sx={STYLES_HEADER.rightBlock}>
        <SearchInput/>
        {
          !isAuthorized && <Button variant='outlined' sx={STYLES_HEADER.loginButton}>Login</Button>
        }
      </Box>

    </header>
  )
}
