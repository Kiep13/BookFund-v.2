import { Box } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths } from '@core/enums';
import { IGenre } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock/hooks';
import { GENRES_MOCK } from '@mocks/genres.mock';
import { StatefulCard, State } from '@features/statefulCard';
import { Card } from '@shared/components/card';
import { PageHeaderCard } from '@shared/components/pageHeaderCard';
import { useApi } from '@shared/hooks';

import { NO_GENRES_MESSAGE, STYLES, SUCCESSFULLY_DELETED } from './constants';
import { GenresTreeView } from './components/genresTreeView';
import { GenreCard } from './components/genreСard';

export const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState<IGenre>(GENRES_MOCK[0]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [treeState, setTreeState] = useState<State>(State.LOADING);
  const [infoState, setInfoState] = useState<State>(State.LOADING);

  const history = useHistory();
  const api = useApi();
  const { addSuccess, addError } = useAlerts();

  const loadGenres = async () => {
    await api.getGenresTree()
      .then((response: AxiosResponse<IGenre[]>) => response.data)
      .then((response: IGenre[]) => {
        setGenres(response);

        if(response.length) {
          loadSelectedGenre(response[0].id);

          setTreeState(State.CONTENT);
          return;
        }

        setTreeState(State.NO_CONTENT);
        setInfoState(State.NO_CONTENT);
      })
      .catch(handleError);
  }

  const loadSelectedGenre = async (id: number) => {
    await api.getGenre(id)
      .then((response: IGenre) => {
        setSelectedGenre(response);
        setInfoState(State.CONTENT);
      })
      .catch(handleError);
  }

  const handleError = () => {
    addError(API_TOOLTIP_ERROR);
    setTreeState(State.ERROR);
    setInfoState(State.ERROR);
  }

  const handleGenreSelection = (genre: IGenre) => {
    setInfoState(State.LOADING);
    loadSelectedGenre(genre.id);
  }

  useEffect(() => {
    loadGenres();
  }, []);

  const handleGenreEdit = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/${selectedGenre.id}`);
  }

  const handleGenreDelete = async () => {
    await api.deleteGenre(selectedGenre.id)
      .then(() => {
        addSuccess(SUCCESSFULLY_DELETED);

        setTreeState(State.LOADING);
        setInfoState(State.LOADING);

        loadGenres();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  return (
    <>
      <Box sx={STYLES.header}>
        <PageHeaderCard title={'Genres'} url={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`}/>
      </Box>

      <Box sx={STYLES.contentWrapper}>
        <Box sx={STYLES.treeCardColumn}>
          <Card styles={STYLES.treeCard}>
            <StatefulCard state={treeState} noContentMessage={NO_GENRES_MESSAGE}>
              <GenresTreeView
                genres={genres}
                onSelectGenre={handleGenreSelection}/>
            </StatefulCard>
          </Card>
        </Box>

        <Box sx={STYLES.infoCardColumn}>
          <Card styles={STYLES.infoCard}>
            <StatefulCard state={infoState} noContentMessage={NO_GENRES_MESSAGE}>
                <GenreCard
                  genre={selectedGenre}
                  onEditClick={handleGenreEdit}
                  onDeleteClick={handleGenreDelete}/>
            </StatefulCard>
          </Card>
        </Box>
      </Box>
    </>
  )
}
