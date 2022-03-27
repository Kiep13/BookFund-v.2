import { Box, Chip, Typography, Rating } from '@mui/material';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CommentForm } from '@components/CommentForm';
import { CommentsList } from '@components/CommentsList';
import { FavoriteActions } from '@components/FavoriteActions';
import { useCommentList } from '@utils/hooks';
import { IComment, IFavorite, IGenre } from '@utils/interfaces';

import { IMAGE_PROPERTIES, STYLES } from './constants';
import { IProps } from './propsInterface';

export const BookContent = ({ book, authorLink, isCommentFormShown, isStatusShown, handleBookChange }: IProps) => {
  const [isCommentSaved, setIsCommentSaved] = useState<boolean>(!book?.isCommented && true);

  const {
    comments,
    count,
    loadingComments,
    addCreatedComment,
    loadComments,
    loadNextPage
  } = useCommentList();

  const handleCommentSave = (comment: IComment) => {
    setIsCommentSaved(false);
    addCreatedComment(comment);
  }

  const handleAddToFavorite = (favorite: IFavorite) => {
    handleBookChange && handleBookChange({
      ...book,
      favorite: favorite
    });
  }

  const handleRemovedFromFavorite = () => {
    delete book?.favorite;

    handleBookChange && handleBookChange({
      ...book
    });
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Box sx={STYLES.content}>
      <Box>
        <Image
          src={book?.image || ''}
          width={IMAGE_PROPERTIES.width}
          height={IMAGE_PROPERTIES.height}
          fit={IMAGE_PROPERTIES.fit}
          errorIcon={IMAGE_PROPERTIES.errorIcon}
          bgColor={IMAGE_PROPERTIES.backgroundColor}
          sx={STYLES.image}/>

        {isStatusShown && book && (
          <FavoriteActions book={book} handleAddedToFavorite={handleAddToFavorite} handleRemovedFromFavorite={handleRemovedFromFavorite}/>
        )}
      </Box>

      <Box sx={STYLES.info}>
        <Typography variant='h3' gutterBottom component='div'>
          { book?.title || '' }
        </Typography>

        <Box sx={STYLES.descriptionBlock}>
          { Boolean(book?.avgRate) && book?.avgRate && <Rating readOnly value={book.avgRate} precision={0.1}/>}
          <Box>
            <Typography variant='body2' sx={STYLES.attributeLabel}>Author: </Typography>
            <Typography variant='body2' sx={STYLES.attributeValue}>
              <Link to={`${authorLink}/${book?.author?.id}`}
                    style={STYLES.link}>
                { book?.author?.name } {book?.author?.surname}
              </Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={STYLES.attributeLabel}>Year: </Typography>
            <Typography variant='body2' sx={STYLES.attributeValue}>{ book?.year }</Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={STYLES.attributeLabel}>Amount of pages: </Typography>
            <Typography variant='body2' sx={STYLES.attributeValue}>{ book?.amountPages }</Typography>
          </Box>
        </Box>

        {
          book?.genres?.map((genre: IGenre) => {
            return <Chip label={genre.name}
                         key={genre.id}
                         color='primary'
                         variant='outlined'
                         sx={STYLES.chip}/>
          })
        }

        {
          book?.description?.split('\n').map((text: string, index: number) => {
            return <p key={`paragraph_${index}`}>{text}</p>
          })
        }

        {
          isCommentSaved && isCommentFormShown &&  book &&
            <Box sx={STYLES.commentForm}>
              <CommentForm book={book} handleSaving={handleCommentSave}/>
            </Box>
        }

        {
          isCommentFormShown && <CommentsList comments={comments}
                                              count={count}
                                              loadingComments={loadingComments}
                                              loadNextPage={loadNextPage}/>
        }
      </Box>
    </Box>
  )
}



