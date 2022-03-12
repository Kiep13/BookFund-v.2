import { Image } from 'mui-image';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { IBook, ICollection, IFormPageParams } from '@core/interfaces';
import { State, StatefulCard } from '@features/statefulCard';
import { useAlerts } from '@features/alertsBlock';
import { HorizontalBookCard } from '@shared/components/horizontalBookCard';
import { EntityPageHeader } from '@shared/components/entityPageHeader';
import { useApi, useBookActions, useCollectionActions } from '@shared/hooks';

import { IMAGE_PROPERTIES, SUCCESSFULLY_DELETED, STYLES, PAGE_TITLE } from './constants';
import { Box, Typography } from '@mui/material';

export const Collection = () => {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [collection, setCollection] = useState<ICollection>();

  const history = useHistory();
  const params = useParams();
  const alerts = useAlerts();
  const api = useApi();
  const bookActions = useBookActions();
  const collectionActions = useCollectionActions();

  const navigateToEditPage = () => {
    collection && collectionActions.navigateToEditForm(collection.id);
  }

  const deleteCollection = () => {
    collection && collectionActions.deleteCollection(collection.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      collectionActions.navigateToCollectionsPage();
    });
  }

  const loadCollection = () => {
    const collectionId = (params as IFormPageParams).id;

    api.getCollection(collectionId)
      .then((response: ICollection) => {
        setCollection(response);
        setPageState(State.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
      })
  }

  useEffect(() => {
    loadCollection();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={deleteCollection}/>

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <Image
            src={collection?.image || ''}
            width={IMAGE_PROPERTIES.width}
            height={IMAGE_PROPERTIES.height}
            fit={IMAGE_PROPERTIES.fit}
            errorIcon={IMAGE_PROPERTIES.errorIcon}
            bgColor={IMAGE_PROPERTIES.backgroundColor}/>

          <Box sx={STYLES.content}>
            <Typography variant='h3' sx={STYLES.heading}>
              { collection?.title }
            </Typography>

            <Box sx={STYLES.booksCount}>
              {collection?.books.length} {collection?.books.length !== 1 ? `books` : `book`}
            </Box>

            {
              collection?.description?.split('\n').map((text: string, index: number) => {
                return <p key={`paragraph_${index}`}>{text}</p>
              })
            }

            {
              collection?.books.map((book: IBook) => {
                return <Link to={bookActions.getBookPageUrl(book.id)}>
                  <Box sx={STYLES.bookBox} key={book.id}>
                    <HorizontalBookCard book={book}/>
                  </Box>
                </Link>
              })
            }

          </Box>
        </StatefulCard>
      </Box>
    </>
  )
}
