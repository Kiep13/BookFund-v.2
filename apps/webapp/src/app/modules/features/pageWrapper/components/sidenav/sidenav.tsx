import { AdminRoutePaths } from "@core/enums";
import { Drawer, List } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { AvatarBlock } from '@shared/components/avatarBlock';

import { GO_ADMIN_MENU_ITEM, GO_USER_MENU_ITEM, LOG_OUT_MENU_ITEM, STYLES_SIDENAV } from '../../constants';
import { IMenuItem } from '../../interfaces';
import { NavItem } from '../navItem';
import { IProps } from './props.interface';

export const Sidenav = (props: IProps) => {
  const location = useLocation();
  const isAdminOpened = location.pathname.includes(AdminRoutePaths.ADMIN);

  return (
    <Drawer
      variant='permanent'
      sx={STYLES_SIDENAV.drawer}
    >
      <AvatarBlock/>
      <List sx={STYLES_SIDENAV.linksBlock}>
        {props.menuItems.map((menuItem: IMenuItem) => (
          <NavItem key={menuItem.title} menuItem={menuItem}/>
        ))}
      </List>
      <List sx={STYLES_SIDENAV.linksBlock}>
        <NavItem menuItem={isAdminOpened ? GO_USER_MENU_ITEM : GO_ADMIN_MENU_ITEM}/>
        <NavItem menuItem={LOG_OUT_MENU_ITEM}/>
      </List>
    </Drawer>
  )
}
