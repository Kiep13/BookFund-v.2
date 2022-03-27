import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { useBookActions, useCollectionLoad } from '@utils/hooks';
import { compose } from '@utils/helpers';

import { PAGE_TITLE } from './constants';

const Page = () => {
  const history = useHistory();

  const {
    collection,
    pageState,
    loadCollection
  } = useCollectionLoad();
  const { getBookPageUrlWithoutId } = useBookActions();

  useEffect(() => {
    loadCollection();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}/>

      <StatefulCard state={pageState}>
        <CollectionContent collection={collection} bookLink={getBookPageUrlWithoutId()}/>
      </StatefulCard>
    </>
  )
}

export const Collection = compose(
  wrapUserPage()
)(Page);

