import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { wrapUserPage } from '@components/PageWrapper';
import { getIsAuthorized } from '@store/reducers';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';
import { compose } from '@utils/helpers';

import { PAGE_TITLE, STYLES } from './constants';

export const Page = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [book, setBook] = useState<IBook>();

  const history = useHistory();
  const params = useParams();

  const isAuthorized = useSelector(getIsAuthorized);

  const { getBook } = useApi();
  const { addError } = useAlerts();
  const { getAuthorPageUrlWithoutId } = useAuthorActions();

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
        handleBackClick={() => history.goBack()}/>

      <Box sx={STYLES.content}>
        <StatefulCard state={pageState}>
          <BookContent book={book} authorLink={getAuthorPageUrlWithoutId()} isCommentFormShown={isAuthorized}/>
        </StatefulCard>
      </Box>
    </>
  )
}

export const Book = compose(
  wrapUserPage()
)(Page);
