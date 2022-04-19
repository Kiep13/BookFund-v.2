import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { getIsAuthorized } from '@store/reducers';
import { useAuthorActions, useBookLoad } from '@utils/hooks';

import { PAGE_TITLE, STYLES } from './constants';

export const Book = () => {
  const history = useHistory();
  const {
    book,
    pageState,
    loadBook,
    handleBookChange
  } = useBookLoad();

  const isAuthorized = useSelector(getIsAuthorized);

  const { getAuthorPageUrlWithoutId } = useAuthorActions();

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
          <BookContent book={book}
                       authorLink={getAuthorPageUrlWithoutId()}
                       isCommentFormShown={isAuthorized}
                       isStatusShown={isAuthorized}
                       handleBookChange={handleBookChange}/>
        </StatefulCard>
      </Box>
    </>
  )
}
