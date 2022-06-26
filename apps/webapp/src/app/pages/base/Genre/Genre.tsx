import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { GenreAutocomplete } from '@components/entityFormElements';
import { StatefulCard } from '@components/cards/StatefulCard';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { BaseRoutePaths } from '@utils/enums';
import { useBackNavigation } from '@utils/hooks';
import { IBook } from '@utils/interfaces';

import { GENRE_LABEL, PAGE_TITLE, STYLES } from './constants';
import { useGenre } from './useGenre';

export const Genre = () => {
  const {
    pageState,
    formik,
    loadingBooks,
    books,
    count,
    initPage,
    handleSelecting,
    handleLoadMore
  } = useGenre();
  const {navigatePreviousPage} = useBackNavigation(BaseRoutePaths.HOME);

  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <Box sx={STYLES.header}>
        <EntityPageHeader
          title={PAGE_TITLE}
          handleBackClick={navigatePreviousPage}
        />
      </Box>

      <Box sx={STYLES.content}>
        <StatefulCard state={pageState}>
          <Box sx={STYLES.autocomplete}>
            <GenreAutocomplete form={formik} fieldName='genre' label={GENRE_LABEL} handleSelecting={handleSelecting}/>
          </Box>

          <Box>
            <Typography component='legend' sx={STYLES.foundTitle}>Found {count} {count !== 1 ? `books` : `book`}</Typography>

            {books.map((book: IBook) => {
              return <Link to={`${BaseRoutePaths.BOOK}/${book.id}`} key={book.id}>
                <Box sx={STYLES.bookBox}>
                  <HorizontalBookCard book={book}/>
                </Box>
              </Link>;
            })}

            {count > books.length && (
              <LoadingButton
                loading={loadingBooks}
                sx={STYLES.loadMoreButton}
                variant='contained'
                onClick={handleLoadMore}>
                Load more
              </LoadingButton>
            )}
          </Box>
        </StatefulCard>
      </Box>
    </>
  );
};
