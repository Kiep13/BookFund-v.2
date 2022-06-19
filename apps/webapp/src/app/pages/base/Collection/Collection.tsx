import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { useBookActions, useCollectionLoad } from '@utils/hooks';
import { getPreviousRoute } from '@store/reducers';
import { BaseRoutePaths } from '@utils/enums';

import { PAGE_TITLE } from './constants';

export const Collection = () => {
  const history = useHistory();

  const {
    collection,
    pageState,
    loadCollection
  } = useCollectionLoad();
  const {getBookPageUrlWithoutId} = useBookActions();

  const previousRoute = useSelector(getPreviousRoute);

  useEffect(() => {
    loadCollection();
  }, []);

  const navigateBack = () => {
    if(previousRoute) {
      history.goBack();
      return;
    }

    history.push(BaseRoutePaths.HOME);
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

