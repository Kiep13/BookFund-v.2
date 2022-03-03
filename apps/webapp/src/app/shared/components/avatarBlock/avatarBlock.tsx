import { Avatar, Box } from '@mui/material';

import { STYLES } from './constants';
import './avatarBlock.scss';

export const AvatarBlock = () => {
  return (
    <Box className='avatar'>
      <Avatar className='avatar__image'
              alt='Cindy Baker'
              sx={STYLES.image}
              src='https://get.pxhere.com/photo/person-girl-woman-hair-photography-portrait-model-youth-fashion-blue-lady-hairstyle-smile-long-hair-face-dress-eye-head-skin-beauty-blond-photo-shoot-brown-hair-portrait-photography-108386.jpg'/>
      <span className='avatar__name'>Cindy Baker</span>
    </Box>
  )
}
