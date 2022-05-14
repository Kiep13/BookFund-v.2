import { debounce } from 'lodash';
import { SyntheticEvent, useCallback, useState } from 'react';

import { CardActions, CardStates, DodecagonPageSizes } from '@utils/enums';
import { useAlerts, useApi, useCollectionActions } from '@utils/hooks';
import {
  API_TOOLTIP_ERROR,
  DELETE_CARD_ACTION,
  EDIT_CARD_ACTION,
  VIEW_CARD_ACTION
} from '@utils/constants';
import { ICardAction, ICardItemAction, ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';

import { DELAY, SUCCESSFULLY_DELETED } from '../../constants';

export const useCollectionsContent = () => {
  const [state, setState] = useState<CardStates>(CardStates.LOADING);
  const [data, setData] = useState<ICollection[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(DodecagonPageSizes.Twelve);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();

  const {getCollections} = useApi();
  const {addError, addSuccess} = useAlerts();
  const {deleteCollection, navigateToAdminCollectionPage, navigateToEditForm} = useCollectionActions();

  const rowsPerPageOptions = Object.values(DodecagonPageSizes).map(value => +value).filter((value) => value);
  const cardActions: ICardAction[] = [VIEW_CARD_ACTION, EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const loadCollections = useCallback(
    debounce(async (search) => {
      setState(CardStates.LOADING);

      const searchOptions: ISearchOptions = {
        pageSize: rowsPerPage,
        page: page,
        searchTerm: search
      }

      getCollections(searchOptions)
        .then((response: IListApiView<ICollection>) => {
          setData(response.data);
          setCount(response.count);

          setState(response.data.length > 0 ? CardStates.CONTENT : CardStates.NO_CONTENT);
        })
        .catch(() => {
          setState(CardStates.ERROR);
          addError(API_TOOLTIP_ERROR);
        })

    }, DELAY),
    [rowsPerPage, page]
  )

  const handleRowsPerPageChanged = (event: any): void => {
    const newRowsPerPage = parseInt(event.target.value, 10);

    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleDeleteConfirmation = (id: number): void => {
    deleteCollection(id, () => {
      addSuccess(SUCCESSFULLY_DELETED);

      if(page !== 0 && data.length === 1) {
        setPage(page - 1);
        return;
      }

      setState(CardStates.LOADING);
      loadCollections(searchTerm);
    });

    setIsModalOpened(false);
  }

  const handleCardAction = (cardAction: ICardItemAction): void => {
    switch (cardAction.actionType) {
      case CardActions.VIEW: {
        navigateToAdminCollectionPage(cardAction.id);
      } break;
      case CardActions.EDIT: {
        navigateToEditForm(cardAction.id);
      } break;
      case CardActions.DELETE: {
        setSelectedId(cardAction.id);
        setIsModalOpened(true);
      } break;
    }
  }

  const handleTyping = (event: SyntheticEvent): void => {
    const { value } = event.target as HTMLTextAreaElement;
    setSearchTerm(value);
  }

  const handleConfirm = (): void => {
    selectedId && handleDeleteConfirmation(selectedId)
  }

  const handleCancel = (): void => {
    setIsModalOpened(false)
  }

  return {
    state,
    data,
    count,
    cardActions,
    searchTerm,
    rowsPerPage,
    page,
    isModalOpened,
    rowsPerPageOptions,
    getCollections: loadCollections,
    handleTyping,
    handlePageChange,
    handleRowsPerPageChanged,
    handleCardAction,
    handleConfirm,
    handleCancel
  }
}
