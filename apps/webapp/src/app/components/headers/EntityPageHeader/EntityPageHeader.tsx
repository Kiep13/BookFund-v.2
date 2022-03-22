import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { Box, IconButton, Typography } from '@mui/material';

import { Card } from '@components/cards/Card';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const EntityPageHeader = ({title, handleBackClick, handleEditClick, handleDeleteClick}: IProps) =>
  <Card styles={STYLES.card}>
    <Box sx={STYLES.content}>

      <Box sx={STYLES.contentColumn}>
        <IconButton
          aria-label='Return'
          sx={STYLES.iconButton}
          onClick={() => handleBackClick()}>
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
        <IconButton
          aria-label='Edit'
          sx={STYLES.iconButton}
          onClick={() => handleEditClick()}>
          <EditTwoToneIcon/>
        </IconButton>

        <IconButton
          aria-label='Delete'
          sx={STYLES.iconButton}
          onClick={() => handleDeleteClick()}>
          <DeleteTwoToneIcon/>
        </IconButton>
      </Box>

    </Box>
  </Card>
