import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';

import { MenuItem } from '../interfaces';

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: HomeTwoToneIcon,
  },
  {
    title: 'Books',
    icon: BookTwoToneIcon,
  },
  {
    title: 'Authors',
    icon: PeopleOutlineTwoToneIcon
  },
  {
    title: 'Genres',
    icon: BookmarksTwoToneIcon
  }
]
