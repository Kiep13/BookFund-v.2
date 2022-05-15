import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { AuthorCard } from '@components/cards/AuthorCard';
import { IAuthor } from '@utils/interfaces';

import { STYLES_AUTHORS_SEARCH_RESULTS } from '../../constants';
import { IProps } from './propsInterface';
import { useAuthorsSearchResult } from './useAuthorsSearchResult';

export const AuthorsSearchResult = ({searchResults, searchTerm}: IProps) => {
  const {
    authors,
    count,
    loading,
    navigateToAuthorPage,
    loadMore
  } = useAuthorsSearchResult(searchResults, searchTerm);

  return (
    <Box>
      <Box sx={STYLES_AUTHORS_SEARCH_RESULTS.wrapper}>
        {authors.map((author: IAuthor) =>
          <CardActionArea key={author.id} onClick={() => navigateToAuthorPage(author.id)}>
            <AuthorCard author={author}/>
          </CardActionArea>
        )}
      </Box>

      {count > authors.length && (
        <Box sx={STYLES_AUTHORS_SEARCH_RESULTS.loadMoreWrapper}>
          <LoadingButton
            loading={loading}
            sx={STYLES_AUTHORS_SEARCH_RESULTS.loadMoreButton}
            variant='contained'
            onClick={loadMore}>
            Load more
          </LoadingButton>
        </Box>
      )}

      {authors.length === 0 &&
      <Typography component='h3' sx={STYLES_AUTHORS_SEARCH_RESULTS.noAuthors}>
        Don't find authors
      </Typography>}
    </Box>
  )
}
