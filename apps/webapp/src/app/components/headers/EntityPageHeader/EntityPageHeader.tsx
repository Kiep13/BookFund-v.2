import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { Box, IconButton, Typography } from '@mui/material';
import { memo } from 'react';

import { Card } from '@components/cards/Card';
import { ICardAction } from '@utils/interfaces';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const EntityPageHeader = memo(({title, actions, handleBackClick, handleIconClick, children}: IProps) => {
  return (
    <Card styles={STYLES.card}>
      <Box sx={STYLES.content}>

        <Box sx={STYLES.contentColumn}>
          <IconButton
            aria-label='Return'
            sx={STYLES.iconButton}
            onClick={handleBackClick}>
            <KeyboardBackspaceTwoToneIcon/>
          </IconButton>

          <Typography
            variant='h5'
            gutterBottom
            component='div'
            sx={STYLES.title}>
            {title}
          </Typography>
        </Box>

        <Box>
          {actions && handleIconClick && actions.map(({icon: Icon, ariLabel, actionType}: ICardAction) => {
            return <IconButton
              aria-label={ariLabel}
              key={actionType}
              sx={STYLES.iconButton}
              onClick={() => handleIconClick(actionType)}>
              <Icon/>
            </IconButton>;
          })}

          {children && <Box>{children}</Box>}
        </Box>
      </Box>
    </Card>
  );
});

