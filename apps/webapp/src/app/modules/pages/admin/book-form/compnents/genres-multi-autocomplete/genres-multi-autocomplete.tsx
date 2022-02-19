import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PageSizes } from '@core/enums';
import { IGenre, IOption, ISearchOptions } from '@core/interfaces';
import { AutocompleteMultiInput } from '@shared/components/form-components/autocomplete-multi-input';
import { apiService } from '@shared/services';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const GenresMultiAutocomplete = ({form, fieldName}: IProps) => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ options, setOptions ] = useState<IOption[]>([]);
  const [ searchTerm, setSearchTerm ] = useState<string>('');

  const getGenres = useCallback(
    debounce(async () => {
      setLoading(true);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: searchTerm
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
    }, DELAY),
    []
  );

  useEffect(() => {
    getGenres();
  }, [searchTerm]);

  return <AutocompleteMultiInput
            form={form}
            fieldName={fieldName}
            handleTyping={setSearchTerm}
            label={'Genres'}
            loading={loading}
            options={options}/>
}
