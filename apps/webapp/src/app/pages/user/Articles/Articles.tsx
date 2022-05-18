import { Box, Button } from '@mui/material';

import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { IArticleFolder } from '@utils/interfaces';

import { ArticleFolderCard } from './components';
import { STYLES } from './constants';
import { useArticles } from './useArticles';

export const Articles = () => {
  const {
    folders,
    handleFolderNewClick,
  } = useArticles();

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

      <Box sx={STYLES.content}>
        {folders.map((folder: IArticleFolder) =>
          <Box key={folder.id}>
            <ArticleFolderCard folder={folder}/>
          </Box>
        )}
      </Box>
    </>
  )
}

