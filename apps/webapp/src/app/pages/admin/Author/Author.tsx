import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Image } from 'mui-image';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { Card } from '@components/cards/Card';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { API_TOOLTIP_ERROR, DELETE_AUTHOR_CONFIRMATION_POPUP } from '@utils/constants';
import { CardStates, PageSizes } from '@utils/enums';
import { IAuthor, IBook, IFormPageParams, IListApiView, ISearchOptions } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions, useBookActions } from '@utils/hooks';

import { IMAGE_PROPERTIES, PAGE_TITLE, STYLES, SUCCESSFULLY_DELETED } from './constants';

export const Author = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [author, setAuthor] = useState<IAuthor>();
  const [count, setCount] = useState<number>(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();

  const api = useApi();
  const alerts = useAlerts();
  const authorsActions = useAuthorActions();
  const bookActions = useBookActions();

  const navigateToEditPage = () => {
    author && authorsActions.navigateToEditForm(author?.id);
  }

  const handleConfirmDeletion = (): void => {
    author && authorsActions.deleteAuthor(author.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      authorsActions.navigateToAuthorsPage();
    });

    setIsModalOpened(false);
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
        setPageState(CardStates.ERROR);
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
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={() => setIsModalOpened(true)}/>

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
                    return <Link to={bookActions.getBookPageUrl(book.id)}>
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

      <ConfirmationPopup
        info={DELETE_AUTHOR_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleConfirmDeletion()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
