import { Box } from '@mui/material';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import {
  DEFAULT_FOLDER_DISPLAYED_NAME,
  DEFAULT_FOLDER_NAME,
  DELETE_ARTICLE_FOLDER_CONFIRMATION_POPUP
} from '@utils/constants';

import { ArticleList } from './components';
import { STYLES } from './constants';
import { useFolder } from './useFolder';

export const Folder = () => {
  const {
    pageState,
    folder,
    simpleActions,
    expandedActions,
    isDeleteModalOpened,
    initPage,
    navigateBack,
    handleHeaderIconClick,
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
        <Box sx={STYLES.header}>
          <EntityPageHeader
            title={folder && !isDefaultFolder ?  folder.name : DEFAULT_FOLDER_DISPLAYED_NAME}
            actions={isDefaultFolder ? simpleActions : expandedActions}
            handleBackClick={navigateBack}
            handleIconClick={handleHeaderIconClick}
          />
        </Box>

        <Box sx={STYLES.content}>
          {folder && <ArticleList folderId={folder.id}/>}
        </Box>
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
