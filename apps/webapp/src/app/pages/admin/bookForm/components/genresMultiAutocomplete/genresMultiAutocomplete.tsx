import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { AutocompleteMultiInput } from '@components/formСomponents/autocompleteMultiInput';
import { PageSizes } from '@utils/enums';
import { IGenre, IOption, ISearchOptions } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const GenresMultiAutocomplete = ({form, fieldName}: IProps) => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ options, setOptions ] = useState<IOption[]>([]);
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const api = useApi();

  const getGenres = useCallback(
    debounce(async (search: string) => {
      setLoading(true);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: search
      }
      const genres = await api.getGenres(searchOptions);

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
    getGenres(searchTerm);
  }, [searchTerm]);

  return <AutocompleteMultiInput
            form={form}
            fieldName={fieldName}
            handleTyping={setSearchTerm}
            label={'Genres'}
            loading={loading}
            options={options}/>
}
