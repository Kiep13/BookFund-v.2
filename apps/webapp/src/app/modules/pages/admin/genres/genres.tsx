import { Box, CircularProgress } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import { AdminRoutePaths } from '@core/enums';
import { API_TOOLTIP_ERROR } from '@core/constants';
import { IGenre } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock/hooks';
import { Card } from '@shared/components/card';
import { PageHeaderCard } from '@shared/components/pageHeaderCard';
import { useApi } from '@shared/hooks';

import { GenreCard } from './components/genreСard';
import { GenresTreeView } from './components/genresTreeView';
import { STYLES } from './constants';

export const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState<IGenre>();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [loadingTree, setLoadingTree] = useState<boolean>(true);
  const [loadingCard, setLoadingCard] = useState<boolean>(true);

  const api = useApi();
  const { addError } = useAlerts();

  const loadGenres = async () => {
    await api.getGenresTree()
      .then((response: AxiosResponse<IGenre[]>) => response.data)
      .then((response: IGenre[]) => {
        setGenres(response);

        if(response.length) {
          loadSelectedGenre(response[0].id);
        }

        setLoadingTree(false);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const loadSelectedGenre = async (id: number) => {
    await api.getGenre(id)
      .then((response: AxiosResponse<IGenre>) => response.data)
      .then((response: IGenre) => {
        setSelectedGenre(response);
        setLoadingCard(false);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const handleGenreSelection = (genre: IGenre) => {
    setLoadingCard(true);
    loadSelectedGenre(genre.id);
  }

  useEffect(() => {
    loadGenres();
  }, []);

  const loadingSpinner = (<Box sx={STYLES.spinner}>
    <CircularProgress size={80}/>
  </Box>);

  return (
    <>
      <Box sx={STYLES.header}>
        <PageHeaderCard title={'Genres'} url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES_NEW}`}/>
      </Box>

      <Box sx={STYLES.contentWrapper}>
        <Box sx={STYLES.treeCardColumn}>
          <Card styles={STYLES.treeCard}>
            {
              loadingTree ?
                loadingSpinner :
                <GenresTreeView
                  genres={genres}
                  onSelectGenre={handleGenreSelection}/>
            }
          </Card>
        </Box>

        <Box sx={STYLES.infoCardColumn}>
          <Card styles={STYLES.infoCard}>
            {
              loadingCard ?
                loadingSpinner :
                <GenreCard genre={selectedGenre}/>
            }
          </Card>
        </Box>
      </Box>
    </>
  )
}
