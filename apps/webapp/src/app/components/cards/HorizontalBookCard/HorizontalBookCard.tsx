import { Box, Card, CardContent, Typography, Rating } from '@mui/material';
import { Image } from 'mui-image';

import { IMAGE_PROPERTIES, STYLES } from './constants';
import { IProps } from './propsInterface';

export const HorizontalBookCard = ({book}: IProps) =>
  <Card sx={STYLES.card}>
    <Image
      src={book?.image || ''}
      width={IMAGE_PROPERTIES.width}
      height={IMAGE_PROPERTIES.height}
      fit={IMAGE_PROPERTIES.fit}
      errorIcon={IMAGE_PROPERTIES.errorIcon}
      bgColor={IMAGE_PROPERTIES.backgroundColor}
      styles={STYLES.image}/>
    <Box sx={STYLES.cardContent}>
      <CardContent>
        <Typography component='div' variant='h5'>
          {book.title}
        </Typography>

        <Rating value={book.avgRate} precision={0.1} readOnly/>

        <Box sx={STYLES.description}>
          {book.description}
        </Box>
      </CardContent>
    </Box>
  </Card>
