import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface MenuItem {
  title: string,
  icon: OverridableComponent<SvgIconTypeMap>,
  url?: string
}
