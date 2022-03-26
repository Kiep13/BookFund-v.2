import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '@components/cards/Card';
import { CommentCard } from '@components/cards/CommentCard';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { PageSizes } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IComment, IFormPageParams, IListApiView, ISearchOptions } from '@utils/interfaces';

import { STYLES } from './constants';

export const CommentsList = () => {
  const [count, setCount] = useState<number>(0);
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  const params = useParams();
  const { getComments } = useApi();
  const { addError } = useAlerts();

  const loadComments = () => {
    setLoadingComments(true);
    const bookId = (params as IFormPageParams).id;

    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Ten,
      page: page,
      keyId: bookId
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

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Box>
      {
        comments.length > 0 && <Typography variant='h4' sx={STYLES.commentsHeading}>Comments</Typography>
      }

      {
        comments.map((comment: IComment) =>
          <Box key={comment.id} sx={STYLES.commentCard}>
            <Card>
              <CommentCard comment={comment}/>
            </Card>

          </Box>
        )
      }

      {
        comments.length === 0 && <Typography variant='h5' sx={STYLES.commentsHeading}>Don't have comments yet</Typography>
      }

      {
        count > comments.length && (
          <LoadingButton
            loading={loadingComments}
            variant='contained'
            onClick={() => setPage(page + 1)}>
            Load more
          </LoadingButton>
        )
      }
    </Box>
  )
}
