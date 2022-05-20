import { Box, Button } from '@mui/material';
import { useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { DELETE_ARTICLE_FOLDER_CONFIRMATION_POPUP } from '@utils/constants';
import { IArticleFolder } from '@utils/interfaces';

import { ArticleFolderCard } from './components';
import { NO_SAVED_FOLDERS, STYLES } from './constants';
import { useArticles } from './useArticles';

export const Articles = () => {
  const {
    folders,
    pageState,
    isDeleteModalOpened,
    initFolders,
    navigateToNewArticleForm,
    navigateToNewFolderForm,
    handleFolderActionClick,
    handleDeleteConfirm,
    handleModalClose
  } = useArticles();

  useEffect(() => {
    initFolders();
  }, [])

  return (
    <>
      <Box sx={STYLES.pageHeader}>
        <PageHeaderCard title='Article folders'>
          <Box sx={STYLES.pageHeaderActions}>
            <Button variant='outlined' onClick={navigateToNewArticleForm}>Add new article</Button>
            <Button variant='contained' onClick={navigateToNewFolderForm}>Add new folder</Button>
          </Box>
        </PageHeaderCard>
      </Box>

      <StatefulCard state={pageState} noContentMessage={NO_SAVED_FOLDERS}>
        <Box sx={STYLES.content}>
          {folders.map((folder: IArticleFolder) =>
            <Box key={folder.id}>
              <ArticleFolderCard folder={folder} handleActionClick={handleFolderActionClick}/>
            </Box>
          )}
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

