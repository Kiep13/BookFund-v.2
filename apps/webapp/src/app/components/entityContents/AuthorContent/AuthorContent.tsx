import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Image } from 'mui-image';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { IBook, IFormPageParams, IListApiView, ISearchOptions } from '@utils/interfaces';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { useAlerts, useApi } from '@utils/hooks';
import { PageSizes } from '@utils/enums';

import { IMAGE_PROPERTIES, STYLES } from './constants';
import { IProps } from './propsInterface';

export const AuthorContent = ({ author, bookLink }: IProps ) => {
  const [count, setCount] = useState<number>(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

  const params = useParams();
  const { getBooks } = useApi();
  const { addError } = useAlerts();

  const loadBooks = (): void => {
    setLoadingBooks(true);
    const authorId = (params as IFormPageParams).id;

    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Ten,
      page: page,
      keyId: authorId
    };

    getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setCount(response.count);
        setBooks([
          ...books,
          ...response.data
        ]);

        setLoadingBooks(false);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

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
        sx={STYLES.image}/>

      <Box sx={STYLES.info}>
        <Typography variant='h3' gutterBottom component='div'>
          {author?.name} {author?.surname}
        </Typography>

        <Box sx={STYLES.booksCount}>{count} {count !== 1 ? `books` : `book`} </Box>

        {
          author?.biography?.split('\n').map((text: string, index: number) => {
            return <p key={`paragraph_${index}`}>{text}</p>
          })
        }

        {
          books.map((book: IBook) => {
            return <Link to={`${bookLink}/${book.id}`}>
              <Box sx={STYLES.bookBox} key={book.id}>
                <HorizontalBookCard book={book}/>
              </Box>
            </Link>
          })
        }

        {
          count > books.length && (
            <LoadingButton
              loading={loadingBooks}
              sx={STYLES.loadMoreButton}
              variant='contained'
              onClick={() => setPage(page + 1)}>
              Load more
            </LoadingButton>
          )
        }
      </Box>
    </Box>
  )
}



