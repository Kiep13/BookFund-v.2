import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';

import { IBook } from '@core/interfaces';
import TextWithHint from '@shared/components/text-with-hint';

export default function BookPromoCard(props: any) {
  const book: IBook = props.book;
  book.authorFullName = `${book.author?.surname || ''} ${book.author?.name}`;

  return (
    <Card sx={{
      width: 170,
      borderRadius: 2,
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={250}
          image={book.image}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div' sx={{
            fontWeight: 100,

          }}>
            <TextWithHint text={ book.title } />
          </Typography>
          <Link href="#" sx={{
            textDecoration: 'none'
          }}>{ book.authorFullName }</Link>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
