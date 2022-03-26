import { Avatar, Box, Typography, Rating } from '@mui/material';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const CommentCard = ({ comment }: IProps) =>
  <Box sx={STYLES.card}>
    <Avatar alt={`${comment?.account?.surname} ${comment?.account?.name}`} src={comment?.account?.image} />
    <Box>
      <Typography component='legend'>{comment?.account?.surname} {comment?.account?.name}</Typography>
      <Rating readOnly precision={0.5} value={comment.rate}/>
      {
        comment.text?.split('\n').map((text: string, index: number) =>
          <Typography variant='body2' gutterBottom key={`paragraph_${index}`}>{text}</Typography>
        )
      }
    </Box>
  </Box>
