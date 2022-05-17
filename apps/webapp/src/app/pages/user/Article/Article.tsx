import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { IArticle } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

export const Article = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [article, setArticle] = useState<IArticle>();
  const history = useHistory();

  const {getArticle} = useApi();

  const loadArticle = (): void => {
    const url = 'https://www.mofaic.gov.ae/ar-ae/missions/minsk';

    getArticle(url)
      .then((response) => {
        setArticle(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        setPageState(CardStates.ERROR);
      })
  }

  const createMarkup = () => {
    return {
      __html: article?.content || ''
    }
  }

  const goBack = (): void => {
    history.goBack();
  }

  useEffect(() => {
    loadArticle();
  }, [])

  return (
    <StatefulCard state={pageState}>
      {article && (
        <>
          <EntityPageHeader title={article?.title} handleBackClick={goBack}/>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </>
      )}

    </StatefulCard>
  )
}
