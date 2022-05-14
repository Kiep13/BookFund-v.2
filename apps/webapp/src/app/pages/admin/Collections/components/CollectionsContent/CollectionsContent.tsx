import { Box, TablePagination, TextField } from '@mui/material';
import {  useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { CollectionCard } from '@components/cards/ColllectionCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { DELETE_COLLECTION_CONFIRMATION_POPUP } from '@utils/constants';
import { ICollection } from '@utils/interfaces';

import { NO_MATCHING_COLLECTIONS, STYLES } from '../../constants';
import { useCollectionsContent } from './useCollectionsContent';

export const CollectionsContent = () => {
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
    getCollections,
    handleTyping,
    handlePageChange,
    handleRowsPerPageChanged,
    handleCardAction,
    handleConfirm,
    handleCancel
  } = useCollectionsContent();

  useEffect(() => {
    getCollections(searchTerm);
  }, [searchTerm, rowsPerPage, page]);

  return (
    <>
      <TextField
        fullWidth
        placeholder={'Type title here...'}
        sx={STYLES.searchInput}
        onChange={handleTyping}/>

      <StatefulCard state={state} noContentMessage={NO_MATCHING_COLLECTIONS}>
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
          {data.map((collection: ICollection) => {
            return <CollectionCard
              key={collection.id}
              collection={collection}
              isActionsAvailable={true}
              actions={cardActions}
              onActionClick={handleCardAction}/>
          })}
        </Box>

      </StatefulCard>

      <ConfirmationPopup
        info={DELETE_COLLECTION_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleConfirm}
        handleClose={handleCancel}
      />
    </>
  )
}
