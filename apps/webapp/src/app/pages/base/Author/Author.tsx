import { Box } from '@mui/material';
import { useEffect } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { useAuthorLoad, useBackNavigation, useBookActions } from '@utils/hooks';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BaseRoutePaths } from '@utils/enums';

import { PAGE_TITLE, STYLES } from './constants';

export const Author = () => {
  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const {getBookPageUrlWithoutId} = useBookActions();
  const {navigatePreviousPage} = useBackNavigation(BaseRoutePaths.HOME);

  useEffect(() => {
    loadAuthor();
  }, []);

  const navigateBack = () => {
    navigatePreviousPage();
  }

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={navigateBack}
      />

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <AuthorContent author={author} bookLink={getBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>
    </>
  )
}
