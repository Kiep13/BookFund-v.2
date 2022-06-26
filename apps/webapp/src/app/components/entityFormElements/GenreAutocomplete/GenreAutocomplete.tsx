import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { AutocompleteInput } from '@components/formСomponents/AutocompleteInput';
import { PageSizes } from '@utils/enums';
import { IGenre, IOption, ISearchOptions } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

import { DELAY } from './constants';
import { IProps } from './propsInterface';

export const GenreAutocomplete = ({form, fieldName, label, handleSelecting}: IProps) => {
  const {getGenres} = useApi();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadGenres = useCallback(
    debounce(async (search: string) => {
      setLoading(true);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: search
      }
      const genres = await getGenres(searchOptions);

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
    loadGenres(searchTerm);
  }, [searchTerm]);

  return (
    <AutocompleteInput
      label={label}
      options={options}
      loading={loading}
      form={form}
      fieldName={fieldName}
      handleTyping={setSearchTerm}
      handleSelecting={handleSelecting}
    />
  );
}
