import { Box, Button } from '@mui/material';

import './image-promo.scss';

export default function ImagePromo(props: any) {
  const {image, alt, clearImage} = props;

  return (
    <Box sx={{
      display: 'block',
      textAlign: 'center',
    }}>
      <img alt={alt} src={image} className={'image-promo__image'}/><br/>
      <Button variant='outlined' onClick={clearImage}>Clear</Button>
    </Box>
  )
}
