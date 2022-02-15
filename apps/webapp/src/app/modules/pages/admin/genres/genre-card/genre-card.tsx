import { Box, Button, Chip, Divider, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { AdminRoutePaths } from '@core/enums';
import { IBook, IGenre } from '@core/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';
import BookPromoCard from '@shared/components/book-promo-card';
import Card from '@shared/components/card';

import * as React from "react";

export default function GenreCard(props: any) {
  const genre: IGenre = props.genre;
  const books: IBook[] = BOOKS_MOCK.slice(0, 7);

  return (
    <Card styles={{
      height: '100%'
    }}>
      <Typography variant='h5'
                  gutterBottom
                  component='div'
                  sx={{
                    fontWeight: 100,
                    m: 0
                  }}>
        { genre.name }
      </Typography>

      <Link href="#" sx={{
        textDecoration: 'none'
      }}>12 books</Link>

      <Divider sx={{
        mt: 2,
        mb: 2
      }}/>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1
      }}>
        <Typography variant='h6'
                    gutterBottom
                    component='div'
                    sx={{
                      fontWeight: 100,
                      m: 0
                    }}>
          { genre.subGenres && genre.subGenres?.length > 0 ? `${genre.subGenres?.length} subgenres` : `Don't have subgenres yet` }
        </Typography>

        <RouterLink to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES_NEW}`}>
          <Button variant='contained'>Add new</Button>
        </RouterLink>
      </Box>

      <Box>
        {
          genre.subGenres?.map((subgenre) => {
            return <Chip key={subgenre.id} label={subgenre.name} variant='outlined' sx={{mb: 1, mr: 1}}/>
          })
        }

      </Box>

      <Divider sx={{
        mt: 2,
        mb: 2
      }}/>

      <Box sx={{
        position: 'relative'
      }}>
        <Typography variant='h6'
                    gutterBottom
                    component='div'
                    sx={{
                      fontWeight: 100,
                      mb: 1
                    }}>
          Best books of this genre
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          width: '100%',
          maxWidth: '100%',
          position: 'absolute'
        }}>
          {
            books.map((book: IBook) => {
              return <Box
                key={book.id}
                sx={{
                display: 'inline-flex',
                p: 1
              }}>
                <BookPromoCard key={book.id} book={book}/>
              </Box>
            })
          }
        </Box>
      </Box>
    </Card>
  )
}
