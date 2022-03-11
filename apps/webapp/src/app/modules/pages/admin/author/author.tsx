import { Box, Typography } from '@mui/material';
import { Image } from 'mui-image';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { IAuthor, IFormPageParams } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock';
import { State, StatefulCard } from '@features/statefulCard';
import { Card } from '@shared/components/card';
import { EntityPageHeader } from '@shared/components/entityPageHeader';
import { useApi, useAuthorActions } from '@shared/hooks';

import { PAGE_TITLE, STYLES, SUCCESSFULLY_DELETED } from './constants';

export const Author = () => {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [author, setAuthor] = useState<IAuthor>();

  const params = useParams();

  const api = useApi();
  const alerts = useAlerts();
  const authorsActions = useAuthorActions();

  const navigateToEditPage = () => {
    author && authorsActions.navigateToEditForm(author?.id);
  }

  const deleteAuthor = (): void => {
    author && authorsActions.deleteAuthor(author.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      authorsActions.navigateToAuthorsPage();
    });
  }

  const loadAuthor = (): void => {
    const authorId = (params as IFormPageParams).id;

    api.getAuthor(authorId)
      .then((response) => {
        setAuthor(response);
        setPageState(State.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
      });
  }

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={authorsActions.navigateToAuthorsPage}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={deleteAuthor}/>

      <Card>
        <Box sx={STYLES.page}>
          <StatefulCard state={pageState}>
            <Box sx={STYLES.content}>
              <Image
                src={author?.image || ''}
                width={'300px'}
                height={'100%'}
                fit={'contain'}
                errorIcon={true}
                bgColor={'inherit'}
                sx={STYLES.authorImage}/>

              <Box sx={STYLES.authorInfo}>
                <Typography variant='h3' gutterBottom component='div'>
                  {author?.name} {author?.surname}
                </Typography>
                <p>
                  {author?.biography}
                </p>
              </Box>
            </Box>

          </StatefulCard>
        </Box>
      </Card>
    </>
  )
}
