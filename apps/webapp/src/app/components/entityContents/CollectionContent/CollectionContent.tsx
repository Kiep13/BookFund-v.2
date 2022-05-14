import { Image } from 'mui-image';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { IBook } from '@utils/interfaces';

import { IMAGE_PROPERTIES, STYLES } from './constants';
import { IProps } from './propsInterface';

export const CollectionContent = ({collection, bookLink}: IProps) =>
  <>
    <Image
      src={collection?.image || ''}
      width={IMAGE_PROPERTIES.width}
      height={IMAGE_PROPERTIES.height}
      fit={IMAGE_PROPERTIES.fit}
      errorIcon={IMAGE_PROPERTIES.errorIcon}
      bgColor={IMAGE_PROPERTIES.backgroundColor}/>

    <Box sx={STYLES.content}>
      <Typography variant='h3' sx={STYLES.heading}>
        {collection?.title}
      </Typography>

      <Box sx={STYLES.booksCount}>
        {collection?.books.length} {collection?.books.length !== 1 ? `books` : `book`}
      </Box>

      {collection?.description?.split('\n').map((text: string, index: number) => {
        return <p key={`paragraph_${index}`}>{text}</p>
      })}

      {collection?.books.map((book: IBook) => {
        return <Link to={`${bookLink}/${book.id}`} key={book.id}>
          <Box sx={STYLES.bookBox}>
            <HorizontalBookCard book={book}/>
          </Box>
        </Link>
      })}

    </Box>
  </>
