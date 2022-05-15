import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { useAuthorLoad, useBookActions } from '@utils/hooks';
import { StatefulCard } from '@components/cards/StatefulCard';

import { PAGE_TITLE, STYLES } from './constants';

export const Author = () => {
  const history = useHistory();

  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const {getBookPageUrlWithoutId} = useBookActions();

  useEffect(() => {
    loadAuthor();
  }, []);

  const navigateBack = () => {
    history.goBack();
  }

  return (
    <>
      <EntityPageHeader title={PAGE_TITLE} handleBackClick={navigateBack}/>

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <AuthorContent author={author} bookLink={getBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>
    </>
  )
}
