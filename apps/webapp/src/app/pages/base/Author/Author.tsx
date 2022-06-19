import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { useAuthorLoad, useBookActions } from '@utils/hooks';
import { StatefulCard } from '@components/cards/StatefulCard';
import { getPreviousRoute } from '@store/reducers';
import { BaseRoutePaths } from '@utils/enums';

import { PAGE_TITLE, STYLES } from './constants';

export const Author = () => {
  const history = useHistory();

  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const {getBookPageUrlWithoutId} = useBookActions();

  const previousRoute = useSelector(getPreviousRoute);

  useEffect(() => {
    loadAuthor();
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

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <AuthorContent author={author} bookLink={getBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>
    </>
  )
}
