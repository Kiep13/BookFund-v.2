import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { useHistory } from 'react-router-dom';

import { BaseRoutePaths } from '@utils/enums';

import { STYLES } from '../../constants';
import { PageViewSelector } from '../PageViewSelector';
import { IProps } from './propsInterface';

export const Header = ({ book, pageView, handlePageViewChange }: IProps) => {
  const history = useHistory();

  const goToBookPage = (): void => {
    history.push(`${BaseRoutePaths.BOOK}/${book.id}`);
  }

  return (
    <AppBar color='default'>
      <Toolbar sx={STYLES.header.wrapper}>
        <Box sx={STYLES.header.titleBlock}>
          <IconButton
            aria-label='Return'
            onClick={goToBookPage}>
            <KeyboardBackspaceTwoToneIcon/>
          </IconButton>
          <Typography
            variant='h6'
            gutterBottom
            component='div'
            sx={STYLES.header.title}>
            { book.title }
          </Typography>
        </Box>

        <PageViewSelector
          pageView={pageView}
          handlePageViewChange={handlePageViewChange}
        />
      </Toolbar>
    </AppBar>
  )
}
