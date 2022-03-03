import { Box } from '@mui/material';
import { useState } from 'react';

import { AdminRoutePaths } from '@core/enums';
import { IGenre } from '@core/interfaces';
import { GENRES_MOCK } from '@mocks/genres.mock';
import { Card } from '@shared/components/card';
import { PageHeaderCard } from '@shared/components/pageHeaderCard';

import { GenreCard } from './components/genreСard';
import { GenresTreeView } from './components/genresTreeView';
import { STYLES } from './constants';

export const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState(GENRES_MOCK[0]);
  const genres: IGenre[] = GENRES_MOCK;

  return (
    <>
      <Box sx={STYLES.header}>
        <PageHeaderCard title={'Genres'} url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES_NEW}`}/>
      </Box>

      <Box sx={STYLES.contentWrapper}>
        <Box sx={STYLES.treeCardColumn}>
          <Card styles={STYLES.treeCard}>
            <GenresTreeView genres={genres} onSelectGenre={setSelectedGenre}/>
          </Card>
        </Box>

        <Box sx={STYLES.infoCardColumn}>
          <GenreCard genre={selectedGenre}/>
        </Box>
      </Box>
    </>
  )
}
