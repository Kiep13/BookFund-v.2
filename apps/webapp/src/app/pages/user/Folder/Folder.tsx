import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import {
  DEFAULT_FOLDER_DISPLAYED_NAME,
  DEFAULT_FOLDER_NAME,
  DELETE_ARTICLE_FOLDER_CONFIRMATION_POPUP
} from '@utils/constants';

import { useFolder } from './useFolder';

export const Folder = () => {
  const {
    pageState,
    folder,
    isDeleteModalOpened,
    initPage,
    navigateBack,
    navigateToEditPage,
    openModal,
    handleDeleteConfirm,
    handleModalClose,
  } = useFolder();

  useEffect(() => {
    initPage();
  }, []);

  const isDefaultFolder = folder && folder.name === DEFAULT_FOLDER_NAME;

  return (
    <>
      <StatefulCard state={pageState}>
        <EntityPageHeader
          title={folder && !isDefaultFolder ?  folder.name : DEFAULT_FOLDER_DISPLAYED_NAME}
          isActionsHidden={isDefaultFolder}
          handleBackClick={navigateBack}
          handleEditClick={navigateToEditPage}
          handleDeleteClick={openModal}
        />
      </StatefulCard>

      <ConfirmationPopup
        info={DELETE_ARTICLE_FOLDER_CONFIRMATION_POPUP}
        isOpened={isDeleteModalOpened}
        handleConfirm={handleDeleteConfirm}
        handleClose={handleModalClose}
      />
    </>
  )
}
