import { Card, CardContent, Typography, CardActionArea, CardActions, Box, IconButton } from '@mui/material';
import moment from 'moment';

import { DATE_CARD_CREATED_AT_FORMAT, DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { ICardAction } from '@utils/interfaces';

import { DEFAULT_FOLDER_DISPLAYED_NAME, DEFAULT_FOLDER_NAME, STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const ArticleFolderCard = ({folder, handleActionClick}: IProps) => {
  const isDefaultFolder = folder.name === DEFAULT_FOLDER_NAME;
  const displayedFolderName = !isDefaultFolder ? folder.name : DEFAULT_FOLDER_DISPLAYED_NAME;
  const displayedDate = moment(folder.createdAt).format(DATE_CARD_CREATED_AT_FORMAT);
  const actions: ICardAction[] = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  return (
    <Card sx={STYLES.folderCard.wrapper}>
      <CardActionArea sx={STYLES.folderCard.actionArea} component='div'>
        <CardContent sx={STYLES.folderCard.content}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={(isDefaultFolder ? STYLES.folderCard.defaultFolderName : {})}
          >
            {displayedFolderName}
          </Typography>

          <Box sx={STYLES.folderCard.bottomBlock}>
            <Typography variant='body2' color='text.secondary'>
              {displayedDate}
            </Typography>
            {!isDefaultFolder && (
              <CardActions disableSpacing sx={STYLES.folderCard.iconActions}>
                {actions.map(({icon: Icon, ariLabel, actionType}: ICardAction) => {
                  return <IconButton
                    aria-label={ariLabel}
                    key={actionType}
                    onClick={() => handleActionClick(folder.id, actionType)}
                  >
                    <Icon/>
                  </IconButton>
                })}
              </CardActions>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
