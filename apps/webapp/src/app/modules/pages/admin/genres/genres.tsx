import { Box } from '@mui/material';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import { IGenre } from '@core/interfaces';
import { GENRES_MOCK } from '@mocks/genres.mock';
import Card from '@shared/components/card';
import PageHeaderCard from '@shared/components/page-header-card';

import GenreCard from './genre-card';
import GenresTreeView from './genres-tree-view';

export default function Genres() {
  const [selectedGenre, setSelectedGenre] = React.useState(GENRES_MOCK[0]);
  const genres: IGenre[] = GENRES_MOCK;

  return (
    <>
      <Box sx={{
        mb: 3
      }}>
        <PageHeaderCard title={'Genres'} url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES_NEW}`}/>
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
            <GenresTreeView genres={genres} onSelectGenre={setSelectedGenre}/>
          </Card>
        </Box>

        <Box sx={{
          flex: 2
        }}>
          <GenreCard genre={selectedGenre}/>
        </Box>
      </Box>
    </>
  )
}
