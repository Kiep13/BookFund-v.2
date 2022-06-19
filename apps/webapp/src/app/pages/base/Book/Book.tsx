import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { getIsAuthorized, getPreviousRoute } from '@store/reducers';
import { BaseRoutePaths } from '@utils/enums';
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
  const previousRoute = useSelector(getPreviousRoute);

  const {getAuthorPageUrlWithoutId} = useAuthorActions();

  useEffect(() => {
    loadBook();
  }, []);

  const navigateBack = () => {
    if(previousRoute) {
      history.goBack();
      return;
    }

    history.push(BaseRoutePaths.HOME);
  }

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={navigateBack}
      />

      <Box sx={STYLES.content}>
        <StatefulCard state={pageState}>
          <BookContent book={book}
                       authorLink={getAuthorPageUrlWithoutId()}
                       isCommentFormShown={isAuthorized}
                       isActionsShown={isAuthorized}
                       handleBookChange={handleBookChange}
          />
        </StatefulCard>
      </Box>
    </>
  )
}
