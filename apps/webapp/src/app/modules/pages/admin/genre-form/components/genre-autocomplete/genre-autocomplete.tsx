import { PageSizes } from "@core/enums";
import { useEffect } from 'react';
import * as React from 'react';

import { IGenre, IOption, ISearchOptions } from '@core/interfaces';
import AutocompleteInput from '@shared/components/form-components/autocomplete-input';
import { apiService } from '@shared/services';

import { IProps } from './props.interface';

export function GenreAutocomplete(props: IProps) {
  const initialOptions: IOption[] = [];
  const { form, fieldName } = props;

  const [options, setOptions] = React.useState(initialOptions);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    async function getGenres() {
      setLoading(loading);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: ''
      }
      const genres = await apiService.getGenres(searchOptions);

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
    <AutocompleteInput options={options} label={'Genre'} loading={loading} form={form} fieldName={fieldName}/>
  );
}
