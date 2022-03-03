import { Box, Button } from '@mui/material';

import { STYLES_IMAGE_PROMO } from '../../constants';
import { IProps } from './props.interface';
import './imagePromo.scss';

export const ImagePromo = ({image, alt, clearImage}: IProps) => {

  return (
    <Box sx={STYLES_IMAGE_PROMO.promoWrapper}>
      <img alt={alt} src={image} className={'image-promo__image'}/><br/>
      <Button variant='outlined' onClick={clearImage}>Clear</Button>
    </Box>
  )
}
