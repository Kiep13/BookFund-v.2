import { Box, Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { DATE_CARD_CREATED_AT_FORMAT } from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { ICardAction } from '@utils/interfaces';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const ArticleCard = ({article, cardActions}: IProps) => {
  const history = useHistory();
  const displayedDate = moment(article.createdAt).format(DATE_CARD_CREATED_AT_FORMAT);

  const navigateToFolderPage = (): void => {
    history.push(`${BaseRoutePaths.ARTICLE}/${article.id}`);
  }

  return (
    <Card sx={STYLES.articleCard.wrapper} onClick={navigateToFolderPage}>
      <CardActionArea sx={STYLES.articleCard.actionArea} component='div'>
        <CardContent sx={STYLES.articleCard.content}>
          <Typography gutterBottom variant='h5' component='div' sx={STYLES.articleCard.title} title={article.title}>
            {article.title}
          </Typography>

          <Box sx={STYLES.articleCard.subInfo}>
            <Typography variant='body2' color='text.secondary'>
              by: {article.hostUrl}
            </Typography>
            {article.isRedirecting && <InsertLinkTwoToneIcon/>}
          </Box>

          <Box sx={STYLES.articleCard.bottomBlock}>
            <Typography variant='body2' color='text.secondary'>
              {displayedDate}
            </Typography>
            <CardActions>
              {cardActions.map(({icon: Icon, ariLabel, actionType}: ICardAction) => {
                return <IconButton
                  aria-label={ariLabel}
                  key={actionType}>
                  <Icon/>
                </IconButton>
              })}
            </CardActions>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
