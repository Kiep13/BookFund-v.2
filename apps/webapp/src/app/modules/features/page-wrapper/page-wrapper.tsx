import { Avatar, InputBase, TextField } from "@mui/material";
import * as React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';

import { MenuItem } from './interfaces';
import './page-wrapper.scss';

const drawerWidth = 200;

export function PageWrapper(props: any) {
  return (
    <section className='page-wrapper'>
      <CssBaseline/>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          border: 0,
          [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
        className='page-wrapper__drawer'
      >
        <div className='page-wrapper__avatar'>
          <Avatar alt='Cindy Baker'
                  sx={{width: 100, height: 100}}
                  src='https://get.pxhere.com/photo/person-girl-woman-hair-photography-portrait-model-youth-fashion-blue-lady-hairstyle-smile-long-hair-face-dress-eye-head-skin-beauty-blond-photo-shoot-brown-hair-portrait-photography-108386.jpg'/>
          <span>Cindy Baker</span>
        </div>
        <List className='page-wrapper__links-block'>
          {props.menuItems.map(({icon: Icon, title}: MenuItem) => (
            <ListItem button key={title}>
              <ListItemIcon>
                <Icon className='page-wrapper__icon'/>
              </ListItemIcon>
              <ListItemText primary={title}/>
            </ListItem>
          ))}
        </List>
        <List className='page-wrapper__links-block'>
          <ListItem>
            <ListItemIcon>
              <DashboardTwoToneIcon className='page-wrapper__icon'/>
            </ListItemIcon>
            <ListItemText primary='Go admin'/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ExitToAppTwoToneIcon className='page-wrapper__icon'/>
            </ListItemIcon>
            <ListItemText primary='Logout'/>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <header className='page-wrapper__header'>
          <div className='page-wrapper__logo'>
            <img alt='bookfund' src='../../../../assets/book.png' className='page-wrapper__logo-image'/>
            <span>BookFund</span>
          </div>
          <TextField label='Search'/>
        </header>
        {props.children}
      </Box>

    </section>
  )
}
