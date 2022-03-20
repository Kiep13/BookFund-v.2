import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { BookPromoCard } from '@components/BookPromoCard';
import { IBook } from '@utils/interfaces';
import { DELETE_GENRE_CONFIRMATION_POPUP } from '@utils/constants';
import { useBookActions } from '@utils/hooks';

import { STYLES } from './constants';
import { IProps } from './props.interface';

export const GenreCard = ({genre, onEditClick, onDeleteClick, onAddSubgenreClick}: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const bookActions = useBookActions();

  const handleDeleteConfirmation = () => {
    onDeleteClick();
    setIsModalOpened(false);
  }

  return (
    <>
      <Box>
        <Box sx={STYLES.genreHeading}>
          <Box>
            <Typography
              variant='h5'
              gutterBottom
              component='div'
              sx={STYLES.genreNameTitle}>
              {genre.name}
            </Typography>

            <span style={STYLES.booksLink}>{genre.books?.length || 0} books</span>
          </Box>
          <Box>
            <IconButton
              aria-label='Edit'
              sx={STYLES.iconButton}
              onClick={() => onEditClick()}>
              <EditTwoToneIcon/>
            </IconButton>
            <IconButton
              aria-label='Delete'
              sx={STYLES.iconButton}
              onClick={() => setIsModalOpened(true)}>
              <DeleteTwoToneIcon/>
            </IconButton>
          </Box>
        </Box>

        <Divider sx={STYLES.divider}/>

        <Box sx={STYLES.actionBlock}>
          <Typography variant='h6'
                      gutterBottom
                      component='div'
                      sx={STYLES.subgenresMessage}>
            {genre.subGenres && genre.subGenres?.length > 0 ? `${genre.subGenres?.length} subgenres` : `Don't have subgenres yet`}
          </Typography>

          <Button variant='contained' onClick={() => onAddSubgenreClick()}>Add new</Button>
        </Box>

        <Box>
          {
            genre.subGenres?.map((subgenre) => {
              return <Chip
                key={subgenre.id}
                label={subgenre.name}
                variant='outlined'
                sx={STYLES.genreChip}/>
            })
          }

        </Box>

        <Divider sx={STYLES.divider}/>

        <Box sx={STYLES.linkedBooksBlock}>
          <Typography
            variant='h6'
            gutterBottom
            component='div'
            sx={STYLES.linkedBooksTitle}>
            Best books of this genre
          </Typography>

          <Box sx={STYLES.linkedBookContent}>
            {
              genre.books && genre.books.length > 0 ?
                (genre.books.slice(0, 10) || []).map((book: IBook) => {
                  return (
                    <Link to={bookActions.getBookPageUrl(book.id)}>
                      <Box
                        key={book.id}
                        sx={STYLES.linkedBook}>
                        <BookPromoCard key={book.id} book={book}/>
                      </Box>
                    </Link>

                  )
                }) :
                `Don't have assigned books`
            }
          </Box>
        </Box>
      </Box>

      <ConfirmationPopup
        info={DELETE_GENRE_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleDeleteConfirmation}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
