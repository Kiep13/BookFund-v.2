import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';

import Card from '@shared/components/card';

import GenreCard from './genre-card';
import GenresTreeView from './genres-tree-view';

export default function Genres() {
  return (
    <>
      <Box sx={{
        mb: 3
      }}>
        <Card>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant='h5'
                        gutterBottom
                        component='div'
                        sx={{
                          fontWeight: 100,
                          m: 0
                        }}>
              Genres
            </Typography>
            <Button variant='contained'>Add new</Button>
          </Box>
        </Card>
      </Box>

      <Box sx={{
        height: 'calc(100vh - 260px)',
        display: 'flex',
        gap: 2
      }}>
        <Box sx={{
          flex: 1
        }}>
          <Card styles={{
            height: '100%'
          }}>
            <GenresTreeView/>
          </Card>
        </Box>

        <Box sx={{
          flex: 2
        }}>
          <GenreCard/>
        </Box>
      </Box>
    </>
  )
}
