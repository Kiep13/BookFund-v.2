import { Box } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GENRES_MOCK } from '@mocks/genres.mock';
import { StatefulCard } from '@components/StatefulCard';
import { Card } from '@components/Card';
import { PageHeaderCard } from '@components/PageHeaderCard';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths, CardStates } from '@utils/enums';
import { IGenre } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { NO_GENRES_MESSAGE, STYLES, SUCCESSFULLY_DELETED } from './constants';
import { GenresTreeView } from './components/genresTreeView';
import { GenreCard } from './components/genreСard';

export const Genres = () => {
  const history = useHistory();
  const api = useApi();
  const { addSuccess, addError } = useAlerts();

  const [selectedGenre, setSelectedGenre] = useState<IGenre>(GENRES_MOCK[0]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [treeState, setTreeState] = useState<CardStates>(CardStates.LOADING);
  const [infoState, setInfoState] = useState<CardStates>(CardStates.LOADING);

  const loadGenres = async () => {
    await api.getGenresTree()
      .then((response: AxiosResponse<IGenre[]>) => response.data)
      .then((response: IGenre[]) => {
        setGenres(response);

        if(response.length) {
          loadSelectedGenre(response[0].id);

          setTreeState(CardStates.CONTENT);
          return;
        }

        setTreeState(CardStates.NO_CONTENT);
        setInfoState(CardStates.NO_CONTENT);
      })
      .catch(handleError);
  }

  const loadSelectedGenre = async (id: number) => {
    await api.getGenre(id)
      .then((response: IGenre) => {
        setSelectedGenre(response);
        setInfoState(CardStates.CONTENT);
      })
      .catch(handleError);
  }

  const handleError = () => {
    addError(API_TOOLTIP_ERROR);
    setTreeState(CardStates.ERROR);
    setInfoState(CardStates.ERROR);
  }

  const handleGenreSelection = (genre: IGenre) => {
    setInfoState(CardStates.LOADING);
    loadSelectedGenre(genre.id);
  }

  const handleAddSubgenre = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`, {
      parent: {
        id: selectedGenre.id,
        name: selectedGenre.name
      },
    });
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

        setTreeState(CardStates.LOADING);
        setInfoState(CardStates.LOADING);

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
                  onAddSubgenreClick={handleAddSubgenre}
                  onEditClick={handleGenreEdit}
                  onDeleteClick={handleGenreDelete}/>
            </StatefulCard>
          </Card>
        </Box>
      </Box>
    </>
  )
}
