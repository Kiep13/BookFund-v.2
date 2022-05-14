import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GENRES_MOCK } from '@mocks/genresMock';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths, CardStates } from '@utils/enums';
import { IGenre } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { SUCCESSFULLY_DELETED } from './constants';

export const useGenres = () => {
  const history = useHistory();
  const {getGenresTree, getGenre, deleteGenre} = useApi();
  const {addSuccess, addError} = useAlerts();

  const [selectedGenre, setSelectedGenre] = useState<IGenre>(GENRES_MOCK[0]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [treeState, setTreeState] = useState<CardStates>(CardStates.LOADING);
  const [infoState, setInfoState] = useState<CardStates>(CardStates.LOADING);

  const loadGenres = async () => {
    await getGenresTree()
      .then((response: AxiosResponse<IGenre[]>) => response.data)
      .then((response: IGenre[]) => {
        setGenres(response);

        if (response.length) {
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
    await getGenre(id)
      .then((response: IGenre) => {
        setSelectedGenre(response);
        setInfoState(CardStates.CONTENT);
      })
      .catch(handleError);
  }

  const handleError = (): void => {
    addError(API_TOOLTIP_ERROR);
    setTreeState(CardStates.ERROR);
    setInfoState(CardStates.ERROR);
  }

  const handleGenreSelection = (genre: IGenre): void => {
    setInfoState(CardStates.LOADING);
    loadSelectedGenre(genre.id);
  }

  const handleAddSubgenre = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`, {
      parent: {
        id: selectedGenre.id,
        name: selectedGenre.name
      },
    });
  }

  const handleGenreEdit = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/${selectedGenre.id}`);
  }

  const handleGenreDelete = async () => {
    await deleteGenre(selectedGenre.id)
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

  return {
    treeState,
    infoState,
    genres,
    selectedGenre,
    loadGenres,
    handleGenreSelection,
    handleAddSubgenre,
    handleGenreEdit,
    handleGenreDelete
  }
}
