import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Card } from '@components/cards/Card';
import { CommentCard } from '@components/cards/CommentCard';
import { IComment } from '@utils/interfaces';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const CommentsList = ({comments, count, loadingComments, loadNextPage}: IProps) =>
  <Box>
    {comments.length > 0 &&
    <Typography
      variant='h4'
      sx={STYLES.commentsHeading}
    >
      Comments
    </Typography>}

    {comments.map((comment: IComment) =>
      <Box key={comment.id} sx={STYLES.commentCard}>
        <Card>
          <CommentCard comment={comment}/>
        </Card>
      </Box>
    )}

    {comments.length === 0 &&
    <Typography
      variant='h5'
      sx={STYLES.commentsHeading}
    >
      Don't have comments yet
    </Typography>}

    {count > comments.length && (
      <LoadingButton
        loading={loadingComments}
        variant='contained'
        onClick={loadNextPage}>
        Load more
      </LoadingButton>
    )}
  </Box>
