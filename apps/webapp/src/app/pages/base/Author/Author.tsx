import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { useAuthorLoad, useBookActions } from '@utils/hooks';
import { StatefulCard } from '@components/cards/StatefulCard';
import { compose } from '@utils/helpers';

import { PAGE_TITLE, STYLES } from './constants';

const Page = () => {
  const history = useHistory();

  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const { getBookPageUrlWithoutId } = useBookActions();

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader title={PAGE_TITLE} handleBackClick={() => history.goBack()}/>

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <AuthorContent author={author} bookLink={getBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>
    </>
  )
}

export const Author = compose(
  wrapUserPage()
)(Page);
