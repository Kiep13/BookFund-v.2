import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';

import { TextWithHint } from '@shared/components/textWithHint';

import { STYLES } from './constants';
import { IProps } from './props.interface';

export const BookPromoCard = ({ book } : IProps) => {
  book.authorFullName = `${book.author?.name} ${book.author?.surname}`;

  return (
    <Card sx={STYLES.wrapper}>
      <CardActionArea>
        <CardMedia
          component='img'
          height={250}
          image={book.image}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div' sx={STYLES.title}>
            <TextWithHint text={ book.title } />
          </Typography>
          <Link href="#" sx={STYLES.authorLink}>{ book.authorFullName }</Link>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
