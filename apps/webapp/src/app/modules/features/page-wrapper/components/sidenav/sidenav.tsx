import NavItem from '@features/page-wrapper/components/nav-item';
import { GO_ADMIN_MENU_ITEM, LOG_OUT_MENU_ITEM } from '@features/page-wrapper/constants';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import * as React from 'react';

import AvatarBlock from '@shared/components/avatar-block';

import { MenuItem } from '../../interfaces';
import './sidenav.scss';

export function Sidenav(props: any) {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 200,
        flexShrink: 0,
        border: 0,
        [`& .MuiDrawer-paper`]: {width: 200, boxSizing: 'border-box'},
      }}
      className='sidenav'
    >
      <AvatarBlock/>
      <List className='sidenav__links-block'>
        {props.menuItems.map((menuItem: MenuItem) => (
          <NavItem key={menuItem.title} menuItem={menuItem}/>
        ))}
      </List>
      <List className='sidenav__links-block'>
        <NavItem menuItem={GO_ADMIN_MENU_ITEM}/>
        <NavItem menuItem={LOG_OUT_MENU_ITEM}/>
      </List>
    </Drawer>
  )
}
