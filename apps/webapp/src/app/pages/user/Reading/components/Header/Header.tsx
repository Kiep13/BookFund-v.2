import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { useHistory } from 'react-router-dom';

import { BaseRoutePaths } from '@utils/enums';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const Header = ({ book }: IProps) => {
  const history = useHistory();

  const goToBookPage = () => {
    history.push(`${BaseRoutePaths.BOOK}/${book.id}`);
  }

  return (
    <AppBar color='default'>
      <Toolbar sx={STYLES.header.wrapper}>
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
      </Toolbar>
    </AppBar>
  )
}
