import Avatar from '@mui/material/Avatar';
import * as React from 'react';

import './avatar-block.scss';

export default function AvatarBlock() {
  return (
    <div className='avatar'>
      <Avatar className='avatar__image'
              alt='Cindy Baker'
              sx={{width: 100, height: 100}}
              src='https://get.pxhere.com/photo/person-girl-woman-hair-photography-portrait-model-youth-fashion-blue-lady-hairstyle-smile-long-hair-face-dress-eye-head-skin-beauty-blond-photo-shoot-brown-hair-portrait-photography-108386.jpg'/>
      <span className='avatar__name'>Cindy Baker</span>
    </div>
  )
}
