import { Box, Button } from '@mui/material';
import { Image } from 'mui-image';

import { IMAGE_PROPERTIES, STYLES_IMAGE_PROMO } from '../../constants';
import { IProps } from './propsInterface';

export const ImagePromo = ({image, clearImage}: IProps) =>
  <Box sx={STYLES_IMAGE_PROMO.promoWrapper}>
    <Box sx={STYLES_IMAGE_PROMO.imageWrapper}>
      <Image
        src={image}
        width={STYLES_IMAGE_PROMO.image.maxWidth}
        height={STYLES_IMAGE_PROMO.image.maxWidth}
        fit={IMAGE_PROPERTIES.fit}
        errorIcon={IMAGE_PROPERTIES.errorIcon}
        bgColor={IMAGE_PROPERTIES.backgroundColor}
        sx={STYLES_IMAGE_PROMO.image}/>
    </Box>
    <Button variant='outlined' onClick={clearImage}>Clear</Button>
  </Box>
