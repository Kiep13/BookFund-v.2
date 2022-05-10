import { Box, Link, Typography } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Image } from 'mui-image';
import { useHistory } from 'react-router-dom';

import { BaseRoutePaths } from '@utils/enums';

import { IMAGE_PROPERTIES, STYLES } from '../../constants';

export const CongratulationsMessage = () => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push(BaseRoutePaths.HOME);
  }

  return (
    <Box sx={STYLES.congratulationsMessage.content}>
      <Typography
        variant='h2'
        gutterBottom
        component='div'
      >
        Congratulations!
      </Typography>

      <Typography
        component='legend'
        sx={STYLES.congratulationsMessage.subtitle}
      >
        You have read this book
      </Typography>

      <Image
        src={'../../../assets/confetti.png'}
        width={IMAGE_PROPERTIES.width}
        height={IMAGE_PROPERTIES.height}
        fit={IMAGE_PROPERTIES.fit}
        errorIcon={IMAGE_PROPERTIES.errorIcon}
        bgColor={IMAGE_PROPERTIES.backgroundColor}
      />

      <Link
        sx={STYLES.congratulationsMessage.homeLink}
        onClick={goToHomePage}
      >
        <ArrowBackTwoToneIcon/>
        Go Home
      </Link>
    </Box>
  )
}
