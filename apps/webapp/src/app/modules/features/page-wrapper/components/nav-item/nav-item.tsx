import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import { IMenuItem } from '@features/page-wrapper/interfaces';

import './nav-item.scss';

export function NavItem(props: any) {
  const {icon: Icon, title, url}: IMenuItem = props.menuItem;

  const itemButton = <ListItemButton key={title}
                                     classes={{
                                       root: 'nav-item',
                                       gutters: 'nav-item'
                                     }}>
    <ListItemIcon>
      <Icon className='nav-item__icon'/>
    </ListItemIcon>
    <ListItemText primary={title}/>
  </ListItemButton>;

  if(url) {
    return (
      <Link to={url} className='nav-item__link'>{itemButton}</Link>
    )
  }

  return (
    itemButton
  )
}
