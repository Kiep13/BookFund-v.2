import { AdminRoutePaths } from "@core/enums";
import { Drawer, List } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { AvatarBlock } from '@shared/components/avatar-block';

import { GO_ADMIN_MENU_ITEM, GO_USER_MENU_ITEM, LOG_OUT_MENU_ITEM, STYLES_SIDENAV } from '../../constants';
import { IMenuItem } from '../../interfaces';
import { NavItem } from '../nav-item';
import { IProps } from './props.interface';
import './sidenav.scss';

export const Sidenav = (props: IProps) => {
  const location = useLocation();
  const isAdminOpened = location.pathname.includes(AdminRoutePaths.ADMIN);

  return (
    <Drawer
      variant='permanent'
      sx={STYLES_SIDENAV.drawer}
      className='sidenav'
    >
      <AvatarBlock/>
      <List className='sidenav__links-block'>
        {props.menuItems.map((menuItem: IMenuItem) => (
          <NavItem key={menuItem.title} menuItem={menuItem}/>
        ))}
      </List>
      <List className='sidenav__links-block'>
        <NavItem menuItem={isAdminOpened ? GO_USER_MENU_ITEM : GO_ADMIN_MENU_ITEM}/>
        <NavItem menuItem={LOG_OUT_MENU_ITEM}/>
      </List>
    </Drawer>
  )
}
