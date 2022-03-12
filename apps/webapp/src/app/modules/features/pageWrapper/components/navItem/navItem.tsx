import { NavLink } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { IMenuItem } from '@features/pageWrapper/interfaces';

import { IProps} from './props.interface';
import './navItem.scss';

export const NavItem = ({menuItem}: IProps) => {
  const {icon: Icon, title, url}: IMenuItem = menuItem;

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
      <NavLink to={url}
               className={(isActive) => isActive ? 'nav-item__active' : 'nav-item__link'}
               exact>
        {itemButton}
      </NavLink>
    )
  }

  return (
    itemButton
  )
}
