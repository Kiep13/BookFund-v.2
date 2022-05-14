import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { IBook } from '@utils/interfaces';

import { IMAGE_PROPERTIES, STYLES } from './constants';
import { IProps } from './propsInterface';
import { useAuthorContent } from './useAuthorContent';

export const AuthorContent = ({author, bookLink}: IProps) => {
  const {
    books,
    count,
    loadingBooks,
    page,
    loadBooks,
    handleLoadMore
  } = useAuthorContent();

  useEffect(() => {
    loadBooks();
  }, [page])

  return (
    <Box sx={STYLES.content}>
      <Image
        src={author?.image || ''}
        width={IMAGE_PROPERTIES.width}
        height={IMAGE_PROPERTIES.height}
        fit={IMAGE_PROPERTIES.fit}
        errorIcon={IMAGE_PROPERTIES.errorIcon}
        bgColor={IMAGE_PROPERTIES.backgroundColor}
        sx={STYLES.image}
      />

      <Box sx={STYLES.info}>
        <Typography
          gutterBottom
          variant='h3'
          component='div'
        >
          {author?.fullName}
        </Typography>

        <Box sx={STYLES.booksCount}>{author?.amountBooks} {author?.amountBooks !== 1 ? `books` : `book`} </Box>

        {author?.biography?.split('\n').map((text: string, index: number) => {
          return <p key={`paragraph_${index}`}>{text}</p>
        })}

        {books.map((book: IBook) => {
          return <Link to={`${bookLink}/${book.id}`} key={book.id}>
            <Box sx={STYLES.bookBox}>
              <HorizontalBookCard book={book}/>
            </Box>
          </Link>
        })}

        {count > books.length && (
          <LoadingButton
            loading={loadingBooks}
            sx={STYLES.loadMoreButton}
            variant='contained'
            onClick={handleLoadMore}>
            Load more
          </LoadingButton>
        )}
      </Box>
    </Box>
  )
}



