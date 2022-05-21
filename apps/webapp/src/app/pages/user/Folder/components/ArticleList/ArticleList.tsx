import { Box, TablePagination, TextField } from '@mui/material';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { IArticle } from '@utils/interfaces';

import { NO_SAVED_ARTICLES, STYLES } from '../../constants';
import { ArticleCard } from '../ArticleCard';
import { useArticleList } from './useArticleList';
import { IProps } from './propsInterface';

export const ArticleList = ({ folderId }: IProps) => {
  const {
    state,
    data,
    count,
    cardActions,
    searchTerm,
    rowsPerPage,
    page,
    isModalOpened,
    rowsPerPageOptions,
    loadCollections,
    handleTyping,
    handlePageChange,
    handleRowsPerPageChanged
  } = useArticleList(folderId);

  useEffect(() => {
    loadCollections(searchTerm);
  }, [searchTerm, rowsPerPage, page]);

  return (
    <>
      <TextField
        fullWidth
        placeholder='Type title here...'
        sx={STYLES.searchInput}
        onChange={handleTyping}
      />

      <StatefulCard state={state} noContentMessage={NO_SAVED_ARTICLES}>
        <TablePagination
          component='div'
          count={count}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={handleRowsPerPageChanged}
        />

        <Box sx={STYLES.cardsWrapper}>
          {data.map((article: IArticle) =>
            <ArticleCard key={article.id} article={article} cardActions={cardActions}/>
          )}
        </Box>
      </StatefulCard>
    </>
  )
}
