import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Card } from '@components/cards/Card';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { API_TOOLTIP_ERROR, DELETE_AUTHOR_CONFIRMATION_POPUP } from '@utils/constants';
import { useAlerts, useApi, useAuthorActions, useBookActions } from '@utils/hooks';
import { IAuthor, IFormPageParams } from '@utils/interfaces';
import { CardStates } from '@utils/enums';

import { PAGE_TITLE, STYLES, SUCCESSFULLY_DELETED } from './constants';

export const Author = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [author, setAuthor] = useState<IAuthor>();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();

  const api = useApi();
  const alerts = useAlerts();
  const authorsActions = useAuthorActions();
  const { getAdminBookPageUrlWithoutId } = useBookActions();

  const navigateToEditPage = () => {
    author && authorsActions.navigateToEditForm(author?.id);
  }

  const handleConfirmDeletion = (): void => {
    author && authorsActions.deleteAuthor(author.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      authorsActions.navigateToAdminAuthorsPage();
    });

    setIsModalOpened(false);
  }

  const loadAuthor = (): void => {
    const authorId = (params as IFormPageParams).id;

    api.getAuthor(authorId)
      .then((response) => {
        setAuthor(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={() => setIsModalOpened(true)}/>

      <Card>
        <Box sx={STYLES.page}>
          <StatefulCard state={pageState}>
            <AuthorContent author={author} bookLink={getAdminBookPageUrlWithoutId()}/>
          </StatefulCard>
        </Box>
      </Card>

      <ConfirmationPopup
        info={DELETE_AUTHOR_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleConfirmDeletion()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
