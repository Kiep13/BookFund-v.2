import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { CardActions } from '@core/enums';

export interface ICardAction {
  ariLabel: string,
  actionType: CardActions,
  icon: OverridableComponent<SvgIconTypeMap>
}
