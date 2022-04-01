import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

import { CollectionCard } from '@components/cards/ColllectionCard';
import { PageSizes } from '@utils/enums';
import { useAlerts, useApi, useCollectionActions } from '@utils/hooks';
import { ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';

import { STYLES_COLLECTIONS_SEARCH_RESULTS } from '../../constants';
import { IProps } from './propsInterface';
import { API_TOOLTIP_ERROR } from "@utils/constants";

export const CollectionsSearchResult = ({searchResults, searchTerm}: IProps) => {
  const [collections, setCollections] = useState<ICollection[]>(searchResults.data);
  const [count, setCount] = useState<number>(searchResults.count);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const { getCollections } = useApi();
  const { addError } = useAlerts();
  const { navigateToCollectionPage } = useCollectionActions();

  const loadData = (pageValue: number) => {
    setLoading(true);
    setPage(pageValue);

    const searchOptions: ISearchOptions = {
      page: pageValue,
      pageSize: PageSizes.Ten,
      searchTerm
    }

    getCollections(searchOptions)
      .then((response: IListApiView<ICollection>) => {
        setCollections([
          ...collections,
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

      <Box sx={STYLES_COLLECTIONS_SEARCH_RESULTS.wrapper}>
        {
          collections.map((collection: ICollection) =>
            <CardActionArea key={collection.id} onClick={() => navigateToCollectionPage(collection.id)}>
              <CollectionCard collection={collection} isActionsAvailable={false}/>
            </CardActionArea>
          )
        }
      </Box>

      {
        count > collections.length && (
          <Box sx={STYLES_COLLECTIONS_SEARCH_RESULTS.loadMoreWrapper}>
            <LoadingButton
              loading={loading}
              sx={STYLES_COLLECTIONS_SEARCH_RESULTS.loadMoreButton}
              variant='contained'
              onClick={() => loadData(page + 1)}>
              Load more
            </LoadingButton>
          </Box>
        )
      }

      {
        collections.length === 0 &&
        <Typography component='h3' sx={STYLES_COLLECTIONS_SEARCH_RESULTS.noCollections}>
          Don't find collections
        </Typography>
      }

    </Box>
  )
}
