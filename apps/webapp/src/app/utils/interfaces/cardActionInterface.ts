import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { CardActions } from '@utils/enums';

export interface ICardAction {
  ariLabel: string;
  actionType: CardActions;
  icon: OverridableComponent<SvgIconTypeMap>;
}
