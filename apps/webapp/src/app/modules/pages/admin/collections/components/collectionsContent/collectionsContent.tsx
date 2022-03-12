import { Box, TablePagination, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { API_TOOLTIP_ERROR, DELETE_CARD_ACTION, EDIT_CARD_ACTION, VIEW_CARD_ACTION } from '@core/constants';
import { CardActions, PageSizes } from '@core/enums';
import { ICardAction, ICardItemAction, ICollection, IListApiView, ISearchOptions } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock';
import { State, StatefulCard } from '@features/statefulCard';
import { CollectionCard } from '@shared/components/colllectionCard';
import { useApi, useCollectionActions } from '@shared/hooks';

import { DELAY, NO_MATCHING_COLLECTIONS, STYLES, SUCCESSFULLY_DELETED } from '../../constants';

export const CollectionsContent = () => {
  const [state, setState] = useState<State>(State.LOADING);
  const [data, setData] = useState<ICollection[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const api = useApi();
  const alerts = useAlerts();
  const collectionActions = useCollectionActions();

  const rowsPerPageOptions = Object.values(PageSizes).map(value => +value).filter((value) => value);
  const cardActions: ICardAction[] = [VIEW_CARD_ACTION, EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const getCollections = useCallback(
    debounce(async (search) => {
      setState(State.LOADING);

      const searchOptions: ISearchOptions = {
        pageSize: rowsPerPage,
        page: page,
        searchTerm: search
      }

      api.getCollections(searchOptions)
        .then((response: IListApiView<ICollection>) => {
          setData(response.data);
          setCount(response.count);

          setState(response.data.length > 0 ? State.CONTENT : State.NO_CONTENT);
        })
        .catch(() => {
          setState(State.ERROR);
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

  const deleteCollection = (id: number) => {
    collectionActions.deleteCollection(id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);

      if(page !== 0 && data.length === 1) {
        setPage(page - 1);
        return;
      }

      setState(State.LOADING);
      getCollections(searchTerm);
    });
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
        deleteCollection(cardAction.id);
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
    </>
  )
}
