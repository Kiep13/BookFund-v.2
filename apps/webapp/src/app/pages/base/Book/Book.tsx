import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { wrapUserPage } from '@components/PageWrapper';
import { getIsAuthorized } from '@store/reducers';
import { useAuthorActions, useBookLoad } from '@utils/hooks';
import { compose } from '@utils/helpers';

import { PAGE_TITLE, STYLES } from './constants';

export const Page = () => {
  const history = useHistory();
  const {
    book,
    pageState,
    loadBook
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
          <BookContent book={book} authorLink={getAuthorPageUrlWithoutId()} isCommentFormShown={isAuthorized}/>
        </StatefulCard>
      </Box>
    </>
  )
}

export const Book = compose(
  wrapUserPage()
)(Page);
