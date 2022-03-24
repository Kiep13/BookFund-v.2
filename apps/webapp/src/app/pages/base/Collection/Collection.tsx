import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { CardStates } from '@utils/enums';
import { compose } from '@utils/helpers';
import { ICollection, IFormPageParams } from '@utils/interfaces';

import { PAGE_TITLE } from './constants';

const Page = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [collection, setCollection] = useState<ICollection>();

  const history = useHistory();
  const params = useParams();
  const { getBookPageUrlWithoutId } = useBookActions();
  const { addError } = useAlerts();
  const { getCollection } = useApi();

  const loadCollection = () => {
    const collectionId = (params as IFormPageParams).id;

    getCollection(collectionId)
      .then((response: ICollection) => {
        setCollection(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

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

