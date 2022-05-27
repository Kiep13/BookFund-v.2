import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { useBookActions, useCollectionLoad } from '@utils/hooks';

import { PAGE_TITLE } from './constants';

export const Collection = () => {
  const history = useHistory();

  const {
    collection,
    pageState,
    loadCollection
  } = useCollectionLoad();
  const {getBookPageUrlWithoutId} = useBookActions();

  useEffect(() => {
    loadCollection();
  }, []);

  const navigateBack = () => {
    history.goBack();
  }

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

