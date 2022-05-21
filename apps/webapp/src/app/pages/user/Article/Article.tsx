import { Box } from '@mui/material';
import { useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { DELETE_ARTICLE_CONFIRMATION_POPUP } from '@utils/constants';

import { STYLES } from './constants';
import { useArticle } from './useArticle';

export const Article = () => {
  const {
    article,
    pageState,
    isModalOpened,
    headerActions,
    initPage,
    navigateBack,
    createMarkup,
    handleHeaderActionClick,
    handleDeleteArticleConfirm,
    closeModal
  } = useArticle();

  useEffect(() => {
    initPage();
  }, [])

  return (
    <>

      <StatefulCard state={pageState}>
        {article && (
          <>
            <EntityPageHeader
              title={article?.title}
              actions={headerActions}
              handleBackClick={navigateBack}
              handleIconClick={handleHeaderActionClick}
            />
            <Box sx={STYLES.content}>
              <div dangerouslySetInnerHTML={createMarkup()} />
            </Box>
          </>
        )}
      </StatefulCard>

      <ConfirmationPopup
        info={DELETE_ARTICLE_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleDeleteArticleConfirm}
        handleClose={closeModal}
      />
    </>
  )
}
