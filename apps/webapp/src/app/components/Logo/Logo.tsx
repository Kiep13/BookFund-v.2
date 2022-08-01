import Box from '@mui/material/Box';
import { Image } from 'mui-image';
import { memo } from 'react';

import { IMAGE_PROPERTIES, STYLES } from './constants';

export const Logo = memo(() => {
  return (
    <Box sx={STYLES.wrapper}>
      <Image
        src='assets/book.png'
        width={STYLES.image.width}
        height={STYLES.image.height}
        fit={IMAGE_PROPERTIES.fit}
        errorIcon={IMAGE_PROPERTIES.errorIcon}
        bgColor={IMAGE_PROPERTIES.backgroundColor}
        sx={STYLES.image}/>
      <span>BookFund</span>
    </Box>
  )
})
