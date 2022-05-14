import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AdminRoutePaths } from '@utils/enums';

import { ADMIN_MENU_ITEMS, STYLES_PAGE_WRAPPER, USER_MENU_ITEMS } from '../../constants';
import { IMenuItem } from '../../interfaces';
import { Header, Sidenav } from '../index';
import { IProps } from './propsInterface';

export const PageWithSidebar = (props: IProps) => {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  const location = useLocation();

  const setMenu = (): void => {
    if (location.pathname.includes(AdminRoutePaths.ADMIN)) {
      setMenuItems(ADMIN_MENU_ITEMS);
      return;
    }

    setMenuItems(USER_MENU_ITEMS);
  }

  useEffect(() => {
    setMenu();
  }, []);

  return (
    <Box sx={STYLES_PAGE_WRAPPER.pageWithSidebar}>
      <Sidenav menuItems={menuItems}/>
      <Box component='main' sx={STYLES_PAGE_WRAPPER.box}>
        <Box sx={STYLES_PAGE_WRAPPER.header}>
          <Header/>
        </Box>
        {props.children}
      </Box>
    </Box>
  )
}

