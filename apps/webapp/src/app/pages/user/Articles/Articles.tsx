import { Box, Button } from '@mui/material';
import { useState } from 'react';

import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { ARTICLES_FOLDERS_MOCK } from '@mocks/articlesFoldersMock';
import { IArticleFolder } from '@utils/interfaces';

import { ArticleFolderCard } from './components';
import { STYLES } from './constants';

export const Articles = () => {
  const [folders, setFolders] = useState<IArticleFolder[]>(ARTICLES_FOLDERS_MOCK);

  return (
    <>
      <Box sx={STYLES.pageHeader}>
        <PageHeaderCard title='Article folders'>
          <Box sx={STYLES.pageHeaderActions}>
            <Button variant='outlined'>Add new article</Button>
            <Button variant='contained'>Add new collection</Button>
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

