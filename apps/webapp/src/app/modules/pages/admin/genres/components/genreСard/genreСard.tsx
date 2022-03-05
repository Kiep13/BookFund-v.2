import { Box, Button, Chip, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { AdminRoutePaths } from '@core/enums';
import { IBook, IGenre } from '@core/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';
import { BookPromoCard } from '@shared/components/bookPromoCard';

import { STYLES } from './constants';

export const GenreCard = (props: any) => {
  const genre: IGenre = props.genre;
  const books: IBook[] = BOOKS_MOCK.slice(0, 7);

  return (
    <Box>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={STYLES.genreNameTitle}>
        { genre.name }
      </Typography>

      <Link href="#" sx={STYLES.booksLink}>12 books</Link>

      <Divider sx={STYLES.divider}/>

      <Box sx={STYLES.actionBlock}>
        <Typography variant='h6'
                    gutterBottom
                    component='div'
                    sx={STYLES.subgenresMessage}>
          { genre.subGenres && genre.subGenres?.length > 0 ? `${genre.subGenres?.length} subgenres` : `Don't have subgenres yet` }
        </Typography>

        <RouterLink to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES_NEW}`}>
          <Button variant='contained'>Add new</Button>
        </RouterLink>
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
            books.map((book: IBook) => {
              return (
                <Box
                  key={book.id}
                  sx={STYLES.linkedBook}>
                  <BookPromoCard key={book.id} book={book}/>
                </Box>
              )
            })
          }
        </Box>
      </Box>
    </Box>
  )
}
