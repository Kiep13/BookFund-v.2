import { useEffect } from 'react';
import * as React from 'react';

import { IGenre, IOption } from '@core/interfaces';
import AutocompleteInput from '@shared/components/form-components/autocomplete-input';
import { apiService } from '@shared/services';

export function GenreAutocomplete() {
  const initialOptions: IOption[] = [];

  const [options, setOptions] = React.useState(initialOptions);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    async function getGenres() {
      setLoading(loading);
      const genres = await apiService.getGenres();

      const genreOptions = genres.map((genre: IGenre) => {
        return {
          id: genre.id,
          title: genre.name
        }
      });

      setOptions(genreOptions);
      setLoading(false);
    }

    getGenres();
  }, []);

  return (
    <AutocompleteInput options={options} label={'Genre'} loading={loading}/>
  );
}
