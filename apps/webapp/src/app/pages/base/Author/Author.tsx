import { Box } from '@mui/material';
import { useCallback, useMemo } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { useAuthorLoad, useBackNavigation, useBookActions } from '@utils/hooks';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BaseRoutePaths } from '@utils/enums';

import { PAGE_TITLE, STYLES } from './constants';

export const Author = () => {
  const {
    author,
    pageState
  } = useAuthorLoad();
  const {getBookPageUrlWithoutId} = useMemo(useBookActions, []);
  const {navigatePreviousPage} = useMemo(() => useBackNavigation(BaseRoutePaths.HOME), []);

  const navigateBack = useCallback(() => {
    navigatePreviousPage();
  }, []);

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
