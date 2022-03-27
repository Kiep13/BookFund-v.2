import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Card } from '@components/cards/Card';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { DELETE_AUTHOR_CONFIRMATION_POPUP } from '@utils/constants';
import { useAlerts, useAuthorActions, useAuthorLoad, useBookActions } from '@utils/hooks';

import { PAGE_TITLE, STYLES, SUCCESSFULLY_DELETED } from './constants';

export const Author = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();

  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const { addSuccess } = useAlerts();
  const { navigateToEditForm, navigateToAdminAuthorsPage, deleteAuthor } = useAuthorActions();
  const { getAdminBookPageUrlWithoutId } = useBookActions();

  const navigateToEditPage = () => {
    author && navigateToEditForm(author?.id);
  }

  const handleConfirmDeletion = (): void => {
    author && deleteAuthor(author.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      navigateToAdminAuthorsPage();
    });

    setIsModalOpened(false);
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
