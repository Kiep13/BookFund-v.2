import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { Image } from 'mui-image';

import { TextWithHint } from '@components/TextWithHint';

import { IMAGE_PROPERTIES } from './constants';
import { IProps } from './propsInterface';

export const AuthorCard = ({author}: IProps) =>
  <Card>
    <CardActionArea>
      <Image
        src={author?.image || ''}
        width={IMAGE_PROPERTIES.width}
        height={IMAGE_PROPERTIES.height}
        fit={IMAGE_PROPERTIES.fit}
        errorIcon={IMAGE_PROPERTIES.errorIcon}
        bgColor={IMAGE_PROPERTIES.backgroundColor}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant='h6'
          component='div'
        >
          <TextWithHint text={ author.fullName || ''} />
        </Typography>
        <Typography component='legend'>
          { author.amountBooks } { author.amountBooks === 1 ? 'book' : 'books ' }
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
