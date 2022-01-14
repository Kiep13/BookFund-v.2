import * as React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';

import { MenuItem } from './interfaces';

const drawerWidth = 240;

export function PageWrapper(props: any) {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            BookFund
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
      >
        <Toolbar/>
        <Box sx={{overflow: 'auto'}}>
          <List>
            {props.menuItems.map(({ icon: Icon, title }: MenuItem) => (
              <ListItem button key={title}>
                <ListItemIcon>
                  <Icon/>
                </ListItemIcon>
                <ListItemText primary={title}/>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
              <ListItem>
                <ListItemIcon>
                   <ExitToAppTwoToneIcon/>
                </ListItemIcon>
                <ListItemText primary='Logout'/>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Toolbar/>
        {props.children}
      </Box>
    </Box>
  )
}
