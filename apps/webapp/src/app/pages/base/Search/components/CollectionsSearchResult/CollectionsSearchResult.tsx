import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { CollectionCard } from '@components/cards/ColllectionCard';
import { ICollection } from '@utils/interfaces';
import { useCollectionsSearchResult } from './useCollectionsSearchResult';

import { STYLES_COLLECTIONS_SEARCH_RESULTS } from '../../constants';
import { IProps } from './propsInterface';

export const CollectionsSearchResult = ({searchResults, searchTerm}: IProps) => {
  const {
    collections,
    count,
    loading,
    navigateToCollectionPage,
    loadMore
  } = useCollectionsSearchResult(searchResults, searchTerm);

  return (
    <Box>
      <Box sx={STYLES_COLLECTIONS_SEARCH_RESULTS.wrapper}>
        {collections.map((collection: ICollection) =>
          <CardActionArea key={collection.id} onClick={() => navigateToCollectionPage(collection.id)}>
            <CollectionCard collection={collection} isActionsAvailable={false}/>
          </CardActionArea>
        )}
      </Box>

      {count > collections.length && (
        <Box sx={STYLES_COLLECTIONS_SEARCH_RESULTS.loadMoreWrapper}>
          <LoadingButton
            loading={loading}
            sx={STYLES_COLLECTIONS_SEARCH_RESULTS.loadMoreButton}
            variant='contained'
            onClick={loadMore}>
            Load more
          </LoadingButton>
        </Box>
      )}

      {collections.length === 0 && (
        <Typography component='h3' sx={STYLES_COLLECTIONS_SEARCH_RESULTS.noCollections}>
          Don't find collections
        </Typography>
      )}
    </Box>
  )
}
