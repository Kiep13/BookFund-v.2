import { Box, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const HorizontalBookCard = ({ book }: IProps) => {
  return (
    <Card sx={STYLES.card}>
      <CardMedia
        component='img'
        sx={STYLES.image}
        image={book.image}
        alt={`${book.title} cover`}
      />
      <Box>
        <CardContent>
          <Typography component='div' variant='h5'>
            { book.title }
          </Typography>

          <Rating value={book.avgRate} precision={0.1} readOnly/>

          <Box sx={STYLES.description}>
            { book.description }
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}
