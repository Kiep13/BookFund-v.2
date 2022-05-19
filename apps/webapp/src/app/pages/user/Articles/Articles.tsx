import { Box, Button } from '@mui/material';

import { StatefulCard } from '@components/cards/StatefulCard';
import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { IArticleFolder } from '@utils/interfaces';

import { ArticleFolderCard } from './components';
import { NO_SAVED_FOLDERS, STYLES } from './constants';
import { useArticles } from './useArticles';
import { useEffect } from "react";

export const Articles = () => {
  const {
    folders,
    pageState,
    initFolders,
    handleFolderNewClick,
  } = useArticles();

  useEffect(() => {
    initFolders();
  }, [])

  return (
    <>
      <Box sx={STYLES.pageHeader}>
        <PageHeaderCard title='Article folders'>
          <Box sx={STYLES.pageHeaderActions}>
            <Button variant='outlined'>Add new article</Button>
            <Button variant='contained' onClick={handleFolderNewClick}>Add new folder</Button>
          </Box>
        </PageHeaderCard>
      </Box>

      <StatefulCard state={pageState} noContentMessage={NO_SAVED_FOLDERS}>
        <Box sx={STYLES.content}>
          {folders.map((folder: IArticleFolder) =>
            <Box key={folder.id}>
              <ArticleFolderCard folder={folder}/>
            </Box>
          )}
        </Box>
      </StatefulCard>
    </>
  )
}

