import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

import { ICardAction, ICardItemAction } from '@core/interfaces';

import { STYLES } from './constants';
import { IProps } from './props.interface';

export const CollectionCard = ({ collection, isActionsAvailable, actions, onActionClick }: IProps) => {
  return (
    <Card sx={STYLES.card}>
      <CardMedia
        component='img'
        height='140'
        image={collection.image}
        alt='collection image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          { collection.title }
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          { collection.subtitle }
        </Typography>
      </CardContent>
      {
        isActionsAvailable && (
          <CardActions disableSpacing sx={STYLES.actionsBlock}>
            {
              (actions || []).map(({icon: Icon, ariLabel, actionType}: ICardAction) => {
                return <IconButton aria-label={ariLabel} onClick={() => {
                  const cardAction: ICardItemAction = {
                    id: collection.id,
                    actionType
                  };
                  onActionClick && onActionClick(cardAction);
                }}>
                  <Icon />
                </IconButton>
              })
            }
          </CardActions>
        )
      }
    </Card>
  )
}
