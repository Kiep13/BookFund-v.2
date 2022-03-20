import { Box, Drawer, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { API_LOGOUT_ERROR, axios } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { AvatarBlock } from '@shared/components/avatarBlock';
import { getIsAdmin, getUser, logout as logoutUser } from '@store/reducers';
import { useApi } from '@shared/hooks';
import { useAlerts } from '@features/alertsBlock';

import {
  API_LOGOUT_SUCCESS,
  GO_ADMIN_MENU_ITEM,
  GO_USER_MENU_ITEM,
  LOG_OUT_MENU_ITEM,
  STYLES_SIDENAV
} from '../../constants';
import { IMenuItem } from '../../interfaces';
import { NavItem } from '../navItem';
import { IProps } from './props.interface';

export const Sidenav = (props: IProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = useApi();
  const { addSuccess, addError } = useAlerts();

  const account = useSelector(getUser);
  const isAdmin = useSelector(getIsAdmin);

  const isAdminOpened = location.pathname.includes(AdminRoutePaths.ADMIN);

  const sendLogoutRequest = () => {
    logout()
      .then(() => {
        addSuccess(API_LOGOUT_SUCCESS);
        dispatch(logoutUser());
        delete axios.defaults.headers.common['Authorization'];
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
        {props.menuItems.map((menuItem: IMenuItem) => (
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
