import { Box, Button, Chip, Typography, Rating } from '@mui/material';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { CommentForm } from '@components/CommentForm';
import { CommentsList } from '@components/CommentsList';
import { FavoriteActions } from '@components/FavoriteActions';
import { BookStatuses } from '@utils/enums';
import { IGenre } from '@utils/interfaces';

import { IMAGE_PROPERTIES, STATUS_LABELS, STYLES } from './constants';
import { useBookContent } from './useBookContent';
import { IProps } from './propsInterface';

export const BookContent = ({book, authorLink, isCommentFormShown, isActionsShown, handleBookChange}: IProps) => {
  const {
    comments,
    count,
    loadingComments,
    isCommentSaved,
    loadComments,
    loadNextPage,
    handleReadClick,
    handleAddToFavorite,
    handleRemovedFromFavorite,
    handleCommentSave
  } = useBookContent(book, handleBookChange);

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
          sx={STYLES.image}
        />

        {isActionsShown && book && (
          <Box sx={STYLES.actions}>
            <Button
              variant='contained'
              size='medium'
              startIcon={<MenuBookTwoToneIcon/>}
              sx={STYLES.readButton}
              onClick={handleReadClick}
            >
              {book.favorite && book.favorite.status === BookStatuses.DONE ? 'Read again' : 'Read'}
            </Button>

            <FavoriteActions
              book={book}
              handleAddedToFavorite={handleAddToFavorite}
              handleRemovedFromFavorite={handleRemovedFromFavorite}
            />
          </Box>
        )}
      </Box>

      <Box sx={STYLES.info}>
        {isActionsShown && book?.favorite && (
          <Box sx={STYLES.status}>
            <Chip label={STATUS_LABELS[book.favorite.status]} color='primary'/>
          </Box>
        )}

        <Typography variant='h3' gutterBottom component='div'>
          {book?.title || ''}
        </Typography>

        <Box sx={STYLES.descriptionBlock}>
          {Boolean(book?.avgRate) && book?.avgRate && <Rating readOnly value={book.avgRate} precision={0.1}/>}
          <Box>
            <Typography variant='body2' sx={STYLES.attributeLabel}>Author: </Typography>
            <Typography variant='body2' sx={STYLES.attributeValue}>
              <Link
                to={`${authorLink}/${book?.author?.id}`}
                style={STYLES.link}
              >
                {book?.author?.name} {book?.author?.surname}
              </Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={STYLES.attributeLabel}>Year: </Typography>
            <Typography variant='body2' sx={STYLES.attributeValue}>{book?.year}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={STYLES.attributeLabel}>Amount of pages: </Typography>
            <Typography variant='body2' sx={STYLES.attributeValue}>{book?.amountPages}</Typography>
          </Box>
        </Box>

        {book?.genres?.map((genre: IGenre) => {
          return <Chip label={genre.name}
                       key={genre.id}
                       color='primary'
                       variant='outlined'
                       sx={STYLES.chip}/>
        })}

        {book?.description?.split('\n').map((text: string, index: number) => {
          return <p key={`paragraph_${index}`}>{text}</p>
        })}

        {isCommentSaved && isCommentFormShown && book &&
        <Box sx={STYLES.commentForm}>
          <CommentForm book={book} handleSaving={handleCommentSave}/>
        </Box>}

        {isCommentFormShown &&
        <CommentsList comments={comments}
                      count={count}
                      loadingComments={loadingComments}
                      loadNextPage={loadNextPage}
        />}
      </Box>
    </Box>
  )
}



