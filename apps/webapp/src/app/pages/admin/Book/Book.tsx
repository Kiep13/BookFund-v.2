import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { Card } from '@components/cards/Card';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { API_TOOLTIP_ERROR, DELETE_BOOK_CONFIRMATION_POPUP } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions, useBookActions } from '@utils/hooks';

import { PAGE_TITLE, SUCCESSFULLY_DELETED, STYLES } from './constants';

export const Book = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [book, setBook] = useState<IBook>();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();

  const { getBook } = useApi();
  const { addSuccess, addError } = useAlerts();
  const { deleteBook, navigateToAdminBooksPage, navigateToEditForm } = useBookActions();
  const { getAdminAuthorPageUrlWithoutId } = useAuthorActions();

  const navigateToEditPage = () => {
    book && navigateToEditForm(book?.id);
  }

  const handleConfirmDeletion = (): void => {
    book && deleteBook(book.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      navigateToAdminBooksPage();
    });

    setIsModalOpened(false);
  }

  const loadBook = (): void => {
    const bookId = (params as IFormPageParams).id;

    getBook(bookId)
      .then((response: IBook) => {
        setBook(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    loadBook();
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
            <BookContent book={book} authorLink={getAdminAuthorPageUrlWithoutId()}/>
          </StatefulCard>
        </Box>
      </Card>

      <ConfirmationPopup
        info={DELETE_BOOK_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleConfirmDeletion()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
