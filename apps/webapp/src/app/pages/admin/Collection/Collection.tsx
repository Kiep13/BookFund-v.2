import { Image } from 'mui-image';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { API_TOOLTIP_ERROR, DELETE_COLLECTION_CONFIRMATION_POPUP } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IBook, ICollection, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions, useCollectionActions } from '@utils/hooks';

import { IMAGE_PROPERTIES, SUCCESSFULLY_DELETED, STYLES, PAGE_TITLE } from './constants';

export const Collection = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [collection, setCollection] = useState<ICollection>();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();
  const alerts = useAlerts();
  const api = useApi();
  const bookActions = useBookActions();
  const collectionActions = useCollectionActions();

  const navigateToEditPage = () => {
    collection && collectionActions.navigateToEditForm(collection.id);
  }

  const handleConfirmDeletion = () => {
    collection && collectionActions.deleteCollection(collection.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      collectionActions.navigateToCollectionsPage();
    });

    setIsModalOpened(false);
  }

  const loadCollection = () => {
    const collectionId = (params as IFormPageParams).id;

    api.getCollection(collectionId)
      .then((response: ICollection) => {
        setCollection(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
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
        handleBackClick={() => history.goBack()}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={() => setIsModalOpened(true)}/>

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

      <ConfirmationPopup
        info={DELETE_COLLECTION_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleConfirmDeletion()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
