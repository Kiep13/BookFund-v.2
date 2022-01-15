import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import Drawer from '@mui/material/Drawer';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import AvatarBlock from "@shared/components/avatar-block";

import { MenuItem } from '../../interfaces';
import './sidenav.scss';

const drawerWidth = 200;

export function Sidenav(props: any) {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        border: 0,
        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
      }}
      className='sidenav'
    >
      <AvatarBlock/>
      <List className='sidenav__links-block'>
        {props.menuItems.map(({icon: Icon, title}: MenuItem) => (
          <ListItemButton key={title}
                          classes={{
                            root: 'sidenav__link',
                            gutters: 'sidenav__link'
                          }}>
            <ListItemIcon>
              <Icon className='sidenav__icon'/>
            </ListItemIcon>
            <ListItemText primary={title}/>
          </ListItemButton>
        ))}
      </List>
      <List className='sidenav__links-block'>
        <ListItemButton classes={{
                          root: 'sidenav__link'
                        }}>
          <ListItemIcon>
            <DashboardTwoToneIcon className='sidenav__icon'/>
          </ListItemIcon>
          <ListItemText primary='Go admin'/>
        </ListItemButton>
        <ListItemButton classes={{
                          root: 'sidenav__link'
                        }}>
          <ListItemIcon>
            <ExitToAppTwoToneIcon className='sidenav__icon'/>
          </ListItemIcon>
          <ListItemText primary='Logout'/>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
