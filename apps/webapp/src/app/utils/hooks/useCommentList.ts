import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { PageSizes } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IComment, IFormPageParams, IListApiView, ISearchOptions } from '@utils/interfaces';

export const useCommentList = () => {
  const [count, setCount] = useState<number>(0);
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  const params = useParams();
  const { getComments } = useApi();
  const { addError } = useAlerts();

  const loadComments = (newPage: number = page) => {
    setLoadingComments(true);
    const bookId = (params as IFormPageParams).id;

    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Ten,
      page: newPage,
      keyId: bookId,
      skip: skip
    };

    getComments(searchOptions)
      .then((response: IListApiView<IComment>) => {
        setCount(response.count);
        setComments([
          ...comments,
          ...response.data
        ]);

        setLoadingComments(false);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
  }

  const loadNextPage = () => {
    setPage(page + 1);
    loadComments(page + 1);
  }

  const addCreatedComment = (comment: IComment) => {
    setComments([
      comment,
      ...comments
    ]);

    setSkip(skip + 1);
  }

  return {
    comments,
    count,
    loadingComments,
    addCreatedComment,
    loadComments,
    loadNextPage
  }
}
