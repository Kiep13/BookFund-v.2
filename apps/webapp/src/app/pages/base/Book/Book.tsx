import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { getIsAuthorized } from '@store/reducers';
import { BaseRoutePaths } from '@utils/enums';
import { useAuthorActions, useBackNavigation, useBookLoad } from '@utils/hooks';

import { PAGE_TITLE, STYLES } from './constants';

export const Book = () => {
  const {
    book,
    pageState,
    handleBookChange
  } = useBookLoad();

  const isAuthorized = useSelector(getIsAuthorized);

  const {getAuthorPageUrlWithoutId} = useAuthorActions();
  const {navigatePreviousPage} = useBackNavigation(BaseRoutePaths.HOME);

  const navigateBack = useCallback(() => {
    navigatePreviousPage();
  }, []);

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
