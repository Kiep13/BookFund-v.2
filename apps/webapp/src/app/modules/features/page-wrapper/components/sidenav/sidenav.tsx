import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import Drawer from '@mui/material/Drawer';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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
      <div className='sidenav__avatar'>
        <Avatar alt='Cindy Baker'
                sx={{width: 100, height: 100}}
                src='https://get.pxhere.com/photo/person-girl-woman-hair-photography-portrait-model-youth-fashion-blue-lady-hairstyle-smile-long-hair-face-dress-eye-head-skin-beauty-blond-photo-shoot-brown-hair-portrait-photography-108386.jpg'/>
        <span>Cindy Baker</span>
      </div>
      <List className='sidenav__links-block'>
        {props.menuItems.map(({icon: Icon, title}: MenuItem) => (
          <ListItem button key={title}>
            <ListItemIcon>
              <Icon className='sidenav__icon'/>
            </ListItemIcon>
            <ListItemText primary={title}/>
          </ListItem>
        ))}
      </List>
      <List className='sidenav__links-block'>
        <ListItem button>
          <ListItemIcon>
            <DashboardTwoToneIcon className='sidenav__icon'/>
          </ListItemIcon>
          <ListItemText primary='Go admin'/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppTwoToneIcon className='sidenav__icon'/>
          </ListItemIcon>
          <ListItemText primary='Logout'/>
        </ListItem>
      </List>
    </Drawer>
  )
}
