import { Link } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { IMenuItem } from '@features/page-wrapper/interfaces';

import { IProps} from './props.interface';
import './nav-item.scss';

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
      <Link to={url} className='nav-item__link'>{itemButton}</Link>
    )
  }

  return (
    itemButton
  )
}
