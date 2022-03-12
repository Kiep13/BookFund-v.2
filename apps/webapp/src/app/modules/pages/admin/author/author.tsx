import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Image } from 'mui-image';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { PageSizes } from '@core/enums';
import { IAuthor, IBook, IFormPageParams, IListApiView, ISearchOptions } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock';
import { State, StatefulCard } from '@features/statefulCard';
import { Card } from '@shared/components/card';
import { EntityPageHeader } from '@shared/components/entityPageHeader';
import { HorizontalBookCard } from '@shared/components/horizontalBookCard';
import { useApi, useAuthorActions } from '@shared/hooks';

import { IMAGE_PROPERTIES, PAGE_TITLE, STYLES, SUCCESSFULLY_DELETED } from './constants';

export const Author = () => {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [author, setAuthor] = useState<IAuthor>();
  const [count, setCount] = useState<number>(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

  const params = useParams();

  const api = useApi();
  const alerts = useAlerts();
  const authorsActions = useAuthorActions();

  const navigateToEditPage = () => {
    author && authorsActions.navigateToEditForm(author?.id);
  }

  const deleteAuthor = (): void => {
    author && authorsActions.deleteAuthor(author.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      authorsActions.navigateToAuthorsPage();
    });
  }

  const loadAuthor = (): void => {
    const authorId = (params as IFormPageParams).id;

    api.getAuthor(authorId)
      .then((response) => {
        setAuthor(response);
        loadBooks();
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
      });
  }

  const loadBooks = (value: number = 0): void => {
    setLoadingBooks(true);
    const authorId = (params as IFormPageParams).id;

    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Ten,
      page: value,
      keyId: authorId
    };

    setPage(value);

    api.getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setCount(response.count);
        setBooks([
          ...books,
          ...response.data
        ]);

        setLoadingBooks(false);
        setPageState(State.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
      });
  }

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={authorsActions.navigateToAuthorsPage}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={deleteAuthor}/>

      <Card>
        <Box sx={STYLES.page}>
          <StatefulCard state={pageState}>
            <Box sx={STYLES.content}>
              <Image
                src={author?.image || ''}
                width={IMAGE_PROPERTIES.width}
                height={IMAGE_PROPERTIES.height}
                fit={IMAGE_PROPERTIES.fit}
                errorIcon={IMAGE_PROPERTIES.errorIcon}
                bgColor={IMAGE_PROPERTIES.backgroundColor}
                sx={STYLES.authorImage}/>

              <Box sx={STYLES.authorInfo}>
                <Typography variant='h3' gutterBottom component='div'>
                  {author?.name} {author?.surname}
                </Typography>

                <Box sx={STYLES.booksCount}>{ count } { count !== 1 ? `books` : `book`} </Box>

                {
                  author?.biography?.split('\n').map((text: string, index: number) => {
                    return <p key={`paragraph_${index}`}>{text}</p>
                  })
                }

                {
                  books.map((book: IBook) => {
                    return <Box sx={STYLES.bookBox} key={book.id}>
                      <HorizontalBookCard book={book}/>
                    </Box>
                  })
                }

                {
                  count > books.length && (
                    <LoadingButton
                      loading={loadingBooks}
                      sx={STYLES.loadMoreButton}
                      variant='contained'
                      onClick={() => loadBooks(page + 1)}>
                      Load more
                    </LoadingButton>
                  )
                }
              </Box>
            </Box>
          </StatefulCard>
        </Box>
      </Card>
    </>
  )
}
