import { Box, TablePagination, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { CollectionCard } from '@components/cards/ColllectionCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { useAlerts, useApi, useCollectionActions } from '@utils/hooks';

import {
  API_TOOLTIP_ERROR,
  DELETE_CARD_ACTION, DELETE_COLLECTION_CONFIRMATION_POPUP,
  EDIT_CARD_ACTION,
  VIEW_CARD_ACTION
} from '@utils/constants';
import { CardActions, PageSizes } from '@utils/enums';
import { ICardAction, ICardItemAction, ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';

import { DELAY, NO_MATCHING_COLLECTIONS, STYLES, SUCCESSFULLY_DELETED } from '../../constants';

export const CollectionsContent = () => {
  const [state, setState] = useState<CardStates>(CardStates.LOADING);
  const [data, setData] = useState<ICollection[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();

  const api = useApi();
  const alerts = useAlerts();
  const collectionActions = useCollectionActions();

  const rowsPerPageOptions = Object.values(PageSizes).map(value => +value).filter((value) => value);
  const cardActions: ICardAction[] = [VIEW_CARD_ACTION, EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const getCollections = useCallback(
    debounce(async (search) => {
      setState(CardStates.LOADING);

      const searchOptions: ISearchOptions = {
        pageSize: rowsPerPage,
        page: page,
        searchTerm: search
      }

      api.getCollections(searchOptions)
        .then((response: IListApiView<ICollection>) => {
          setData(response.data);
          setCount(response.count);

          setState(response.data.length > 0 ? CardStates.CONTENT : CardStates.NO_CONTENT);
        })
        .catch(() => {
          setState(CardStates.ERROR);
          alerts.addError(API_TOOLTIP_ERROR);
        })

    }, DELAY),
    []
  )

  const handleRowsPerPageChanged = (event: any): void => {
    const newRowsPerPage = parseInt(event.target.value, 10);

    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleDeleteConfirmation = (id: number) => {
    collectionActions.deleteCollection(id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);

      if(page !== 0 && data.length === 1) {
        setPage(page - 1);
        return;
      }

      setState(CardStates.LOADING);
      getCollections(searchTerm);
    });

    setIsModalOpened(false);
  }

  const handleCardAction = (cardAction: ICardItemAction) => {
    switch (cardAction.actionType) {
      case CardActions.VIEW: {
        collectionActions.navigateToCollectionPage(cardAction.id);
      } break;
      case CardActions.EDIT: {
        collectionActions.navigateToEditForm(cardAction.id);
      } break;
      case CardActions.DELETE: {
        setSelectedId(cardAction.id);
        setIsModalOpened(true);
      } break;
    }
  }

  const handleTyping = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    setSearchTerm(value);
  }

  useEffect(() => {
    getCollections(searchTerm);
  }, [searchTerm]);

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
          {
            data.map((collection: ICollection) => {
              return <CollectionCard
                        key={collection.id}
                        collection={collection}
                        isActionsAvailable={true}
                        actions={cardActions}
                        onActionClick={handleCardAction}/>
            })
          }
        </Box>

      </StatefulCard>

      <ConfirmationPopup
        info={DELETE_COLLECTION_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => selectedId && handleDeleteConfirmation(selectedId)}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
