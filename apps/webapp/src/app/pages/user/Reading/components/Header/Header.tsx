import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { useNavigate } from 'react-router-dom';

import { BaseRoutePaths } from '@utils/enums';

import { STYLES } from '../../constants';
import { PageViewSelector } from '../PageViewSelector';
import { IProps } from './propsInterface';

export const Header = ({book, pageView, isLastPageOpened, handlePageViewChange, handleMarkAsDone}: IProps) => {
  const navigate = useNavigate();

  const goToBookPage = (): void => {
    navigate(`${BaseRoutePaths.BOOK}/${book.id}`);
  }

  const handleMarkAsDoneClick = (): void => {
    handleMarkAsDone();
  }

  return (
    <AppBar color='default'>
      <Toolbar sx={STYLES.header.wrapper}>
        <Box sx={STYLES.header.titleBlock}>
          <IconButton
            aria-label='Return'
            onClick={goToBookPage}
          >
            <KeyboardBackspaceTwoToneIcon/>
          </IconButton>
          <Typography
            variant='h6'
            gutterBottom
            component='div'
            sx={STYLES.header.title}
          >
            {book.title}
          </Typography>
        </Box>

        <Box sx={STYLES.header.actions}>
          {isLastPageOpened && (
            <Button
              variant='contained'
              onClick={handleMarkAsDoneClick}
            >
              Mark as done
            </Button>
          )}
          <PageViewSelector
            pageView={pageView}
            handlePageViewChange={handlePageViewChange}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
