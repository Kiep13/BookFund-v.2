import { Box } from '@mui/material';
import { useEffect } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';

import { STYLES } from './constants';
import { useArticle } from './useArticle';

export const Article = () => {
  const {
    article,
    pageState,
    initPage,
    navigateBack,
    createMarkup
  } = useArticle();

  useEffect(() => {
    initPage();
  }, [])

  return (
    <StatefulCard state={pageState}>
      {article && (
        <>
          <EntityPageHeader
            title={article?.title}
            handleBackClick={navigateBack}
          />
          <Box sx={STYLES.content}>
            <div dangerouslySetInnerHTML={createMarkup()} />
          </Box>
        </>
      )}

    </StatefulCard>
  )
}
