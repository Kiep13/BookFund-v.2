import { NavLink, useMatch } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { IMenuItem } from '../../interfaces';
import { STYLES_NAV_LINK } from '../../constants';
import { IProps } from './propsInterface';

export const NavItem = ({menuItem}: IProps) => {
  const match = useMatch({ path: menuItem.url || '', end: true });
  const {icon: Icon, title, url}: IMenuItem = menuItem;

  const itemButton = <ListItemButton key={title}
                                     sx={STYLES_NAV_LINK.navItem}>
    <ListItemIcon>
      <Icon sx={STYLES_NAV_LINK.navIcon}/>
    </ListItemIcon>
    <ListItemText primary={title}/>
  </ListItemButton>;

  if(url) {
    return (
      <NavLink to={url} style={(match ? STYLES_NAV_LINK.navLinkActive : STYLES_NAV_LINK.navLink)}>
        {itemButton}
      </NavLink>
    )
  }

  return itemButton;
}
