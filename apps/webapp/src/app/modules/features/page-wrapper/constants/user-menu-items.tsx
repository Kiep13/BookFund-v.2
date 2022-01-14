import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';

import { MenuItem } from '../interfaces';

export const USER_MENU_ITEMS: MenuItem[] = [
  {
    title: 'Home',
    icon: HomeTwoToneIcon,
  },
  {
    title: 'Favorites',
    icon: FavoriteTwoToneIcon
  },
  {
    title: 'Articles',
    icon: FolderTwoToneIcon
  }
]
