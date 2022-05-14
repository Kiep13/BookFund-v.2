import { Box } from '@mui/material';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { Card } from '@components/cards/Card';
import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { AdminRoutePaths } from '@utils/enums';

import { NO_GENRES_MESSAGE, STYLES } from './constants';
import { GenresTreeView } from './components/GenresTreeView';
import { GenreCard } from './components/GenreСard';
import { useGenres } from './useGenres';

export const Genres = () => {
  const {
    treeState,
    infoState,
    genres,
    selectedGenre,
    loadGenres,
    handleGenreSelection,
    handleAddSubgenre,
    handleGenreEdit,
    handleGenreDelete
  } = useGenres();

  useEffect(() => {
    loadGenres();
  }, []);

  return (
    <>
      <Box sx={STYLES.header}>
        <PageHeaderCard title='Genres' url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`}/>
      </Box>

      <Box sx={STYLES.contentWrapper}>
        <Box sx={STYLES.treeCardColumn}>
          <Card styles={STYLES.treeCard}>
            <StatefulCard state={treeState} noContentMessage={NO_GENRES_MESSAGE}>
              <GenresTreeView
                genres={genres}
                onSelectGenre={handleGenreSelection}
              />
            </StatefulCard>
          </Card>
        </Box>

        <Box sx={STYLES.infoCardColumn}>
          <Card styles={STYLES.infoCard}>
            <StatefulCard state={infoState} noContentMessage={NO_GENRES_MESSAGE}>
                <GenreCard
                  genre={selectedGenre}
                  onAddSubgenreClick={handleAddSubgenre}
                  onEditClick={handleGenreEdit}
                  onDeleteClick={handleGenreDelete}
                />
            </StatefulCard>
          </Card>
        </Box>
      </Box>
    </>
  )
}
