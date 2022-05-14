import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

import { ICardAction, ICardItemAction } from '@utils/interfaces';
import { CardActions as CardActionsType } from '@utils/enums';

import { HEIGHT_WITH_ACTIONS, HEIGHT_WITHOUT_ACTIONS, STYLES } from './constants';
import { IProps } from './propsInterface';

export const CollectionCard = ({collection, isActionsAvailable, actions, onActionClick}: IProps) => {
  const handleActionClick = (actionType: CardActionsType) => {
    const cardAction: ICardItemAction = {
      id: collection.id,
      actionType
    };
    onActionClick && onActionClick(cardAction);
  };

  return (
    <Card sx={{
      ...STYLES.card,
      height: actions && actions.length > 0 ? HEIGHT_WITH_ACTIONS : HEIGHT_WITHOUT_ACTIONS
    }}>
      <CardMedia
        component='img'
        height='140'
        image={collection.image}
        alt='collection image'
      />
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
        >
          {collection.title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {collection.subtitle}
        </Typography>
      </CardContent>
      {
        isActionsAvailable && (
          <CardActions disableSpacing sx={STYLES.actionsBlock}>
            {(actions || []).map(({icon: Icon, ariLabel, actionType}: ICardAction) => {
              return <IconButton
                aria-label={ariLabel}
                key={actionType}
                onClick={() => handleActionClick(actionType)}>
                <Icon/>
              </IconButton>
            })}
          </CardActions>
        )
      }
    </Card>
  )
}



