import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PageSizes } from '@core/enums';
import { IGenre, IOption, ISearchOptions } from '@core/interfaces';
import { AutocompleteInput } from '@shared/components/formСomponents/autocompleteInput';
import { useApi } from '@shared/hooks';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const GenreAutocomplete = (props: IProps) => {
  const { form, fieldName } = props;
  const api = useApi();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <AutocompleteInput
      options={options}
      label={'Parent genre'}
      loading={loading}
      form={form}
      fieldName={fieldName}
      handleTyping={setSearchTerm}/>
  );
}
