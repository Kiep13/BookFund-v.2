import { Box, TablePagination, TextField } from '@mui/material';
import { useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { DELETE_ARTICLE_CONFIRMATION_POPUP } from '@utils/constants';
import { IArticle } from '@utils/interfaces';

import { MAX_SEARCH_LENGTH_INPUT, NO_SAVED_ARTICLES, STYLES } from '../../constants';
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
    handleRowsPerPageChanged,
    handleCardActionClick,
    handleDeleteArticleConfirm,
    closeModal
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
        helperText={<Box sx={STYLES.hint}>{searchTerm.length}/{MAX_SEARCH_LENGTH_INPUT}</Box>}
        inputProps={{
          maxLength: MAX_SEARCH_LENGTH_INPUT
        }}
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
            <ArticleCard
              key={article.id}
              article={article}
              cardActions={cardActions}
              handleCardActionClick={handleCardActionClick}
            />
          )}
        </Box>
      </StatefulCard>

      <ConfirmationPopup
        info={DELETE_ARTICLE_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleDeleteArticleConfirm}
        handleClose={closeModal}
      />
    </>
  )
}
