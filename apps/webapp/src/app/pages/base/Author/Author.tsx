import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { StatefulCard } from '@components/cards/StatefulCard';
import { IAuthor, IFormPageParams } from '@utils/interfaces';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { compose } from '@utils/helpers';

import { PAGE_TITLE, STYLES } from './constants';

const Page = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [author, setAuthor] = useState<IAuthor>();

  const history = useHistory();
  const params = useParams();
  const { getBookPageUrlWithoutId } = useBookActions();
  const { getAuthor } = useApi();
  const { addError } = useAlerts();

  const loadAuthor = (): void => {
    const authorId = (params as IFormPageParams).id;

    getAuthor(authorId)
      .then((response) => {
        setAuthor(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader title={PAGE_TITLE} handleBackClick={() => history.goBack()}/>

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <AuthorContent author={author} bookLink={getBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>
    </>
  )
}

export const Author = compose(
  wrapUserPage()
)(Page);
