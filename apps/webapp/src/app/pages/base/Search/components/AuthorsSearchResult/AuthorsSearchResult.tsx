import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

import { AuthorCard } from '@components/cards/AuthorCard';
import { IAuthor, IListApiView, ISearchOptions } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';
import { DodecagonPageSizes } from '@utils/enums';
import { API_TOOLTIP_ERROR } from '@utils/constants';

import { STYLES_AUTHORS_SEARCH_RESULTS } from '../../constants';
import { IProps } from './propsInterface';

export const AuthorsSearchResult = ({ searchResults, searchTerm }: IProps) => {
  const [authors, setAuthors] = useState<IAuthor[]>(searchResults.data);
  const [count, setCount] = useState<number>(searchResults.count);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const { getAuthors } = useApi();
  const { addError } = useAlerts();
  const { navigateToAuthorPage } = useAuthorActions();

  const loadData = (pageValue: number) => {
    setLoading(true);
    setPage(pageValue);

    const searchOptions: ISearchOptions = {
      page: pageValue,
      pageSize: DodecagonPageSizes.Twelve,
      searchTerm
    }

    getAuthors(searchOptions)
      .then((response: IListApiView<IAuthor>) => {
        setAuthors([
          ...authors,
          ...response.data
        ]);
        setCount(response.count);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Box>
      <Box sx={STYLES_AUTHORS_SEARCH_RESULTS.wrapper}>
        {
          authors.map((author: IAuthor) =>
            <CardActionArea key={author.id} onClick={() => navigateToAuthorPage(author.id)}>
              <AuthorCard author={author}/>
            </CardActionArea>
          )
        }
      </Box>

      {
        count > authors.length && (
          <Box sx={STYLES_AUTHORS_SEARCH_RESULTS.loadMoreWrapper}>
            <LoadingButton
              loading={loading}
              sx={STYLES_AUTHORS_SEARCH_RESULTS.loadMoreButton}
              variant='contained'
              onClick={() => loadData(page + 1)}>
              Load more
            </LoadingButton>
          </Box>
        )
      }

      {
        authors.length === 0 &&
        <Typography component='h3' sx={STYLES_AUTHORS_SEARCH_RESULTS.noAuthors}>
          Don't find authors
        </Typography>
      }
    </Box>
  )
}
