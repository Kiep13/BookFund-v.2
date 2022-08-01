import { useCallback } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { useBackNavigation, useBookActions, useCollectionLoad } from '@utils/hooks';
import { BaseRoutePaths } from '@utils/enums';

import { PAGE_TITLE } from './constants';

export const Collection = () => {
  const {collection, pageState} = useCollectionLoad();
  const {getBookPageUrlWithoutId} = useBookActions();
  const {navigatePreviousPage} = useBackNavigation(BaseRoutePaths.HOME);

  const navigateBack = useCallback(() => {
    navigatePreviousPage();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={navigateBack}
      />

      <StatefulCard state={pageState}>
        <CollectionContent collection={collection} bookLink={getBookPageUrlWithoutId()}/>
      </StatefulCard>
    </>
  )
}

