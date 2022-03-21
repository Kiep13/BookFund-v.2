import { Box, Drawer, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AvatarBlock } from '@components/AvatarBlock';
import { getIsAdmin, getUser } from '@store/reducers';
import { API_LOGOUT_ERROR } from '@utils/constants';
import { AdminRoutePaths } from '@utils/enums';
import { useAlerts, useApi, useAuthHandlers } from '@utils/hooks';

import {
  API_LOGOUT_SUCCESS,
  GO_ADMIN_MENU_ITEM,
  GO_USER_MENU_ITEM,
  LOG_OUT_MENU_ITEM,
  STYLES_SIDENAV
} from '../../constants';
import { IMenuItem } from '../../interfaces';
import { NavItem } from '../NavItem';
import { IProps } from './propsInterface';

export const Sidenav = ({menuItems}: IProps) => {
  const location = useLocation();
  const { logout } = useApi();

  const { addSuccess, addError } = useAlerts();
  const { handleLogOut } = useAuthHandlers();

  const account = useSelector(getUser);
  const isAdmin = useSelector(getIsAdmin);

  const isAdminOpened = location.pathname.includes(AdminRoutePaths.ADMIN);

  const sendLogoutRequest = () => {
    logout()
      .then(() => {
        addSuccess(API_LOGOUT_SUCCESS);
        handleLogOut();
      })
      .catch(() => {
        addError(API_LOGOUT_ERROR);
      });
  }

  return (
    <Drawer
      variant='permanent'
      sx={STYLES_SIDENAV.drawer}
    >
      <AvatarBlock account={account}/>
      <List sx={STYLES_SIDENAV.linksBlock}>
        {menuItems.map((menuItem: IMenuItem) => (
          <NavItem key={menuItem.title} menuItem={menuItem}/>
        ))}
      </List>
      <List sx={STYLES_SIDENAV.linksBlock}>
        {
          isAdmin &&
          <NavItem menuItem={isAdminOpened ? GO_USER_MENU_ITEM : GO_ADMIN_MENU_ITEM}/>
        }
        <Box onClick={sendLogoutRequest}>
          <NavItem menuItem={LOG_OUT_MENU_ITEM} />
        </Box>
      </List>
    </Drawer>
  )
}
