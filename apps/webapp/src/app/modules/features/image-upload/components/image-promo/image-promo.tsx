import { Box, Button } from '@mui/material';

import { STYLES_IMAGE_PROMO } from '../../constants';
import { IProps } from './props.interface';
import './image-promo.scss';

export default function ImagePromo(props: IProps) {
  const {image, alt, clearImage} = props;

  return (
    <Box sx={STYLES_IMAGE_PROMO.promoWrapper}>
      <img alt={alt} src={image} className={'image-promo__image'}/><br/>
      <Button variant='outlined' onClick={clearImage}>Clear</Button>
    </Box>
  )
}
