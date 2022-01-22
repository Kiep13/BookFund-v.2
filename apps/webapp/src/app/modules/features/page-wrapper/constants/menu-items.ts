import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';

import { AdminRoutePaths, BaseRoutePaths } from '@core/enums';

import { IMenuItem } from '../interfaces';

export const ADMIN_MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Dashboard',
    icon: HomeTwoToneIcon,
    url: `${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`
  },
  {
    title: 'Books',
    icon: BookTwoToneIcon,
    url: `${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`
  },
  {
    title: 'Authors',
    icon: PeopleOutlineTwoToneIcon,
    url: `${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`
  },
  {
    title: 'Genres',
    icon: BookmarksTwoToneIcon,
    url: `${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`
  }
];

export const USER_MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Home',
    icon: HomeTwoToneIcon,
    url: BaseRoutePaths.HOME
  },
  {
    title: 'Favorites',
    icon: FavoriteTwoToneIcon,
    url: BaseRoutePaths.FAVORITES
  },
  {
    title: 'Articles',
    icon: FolderTwoToneIcon,
    url: BaseRoutePaths.ARTICLES
  }
];

export const GO_ADMIN_MENU_ITEM: IMenuItem = {
  title: 'Go admin',
  icon: DashboardTwoToneIcon,
  url: `${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`
};

export const LOG_OUT_MENU_ITEM: IMenuItem = {
  title: 'Log out',
  icon: ExitToAppTwoToneIcon
}
