import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PageSizes } from '@core/enums';
import { IGenre, IOption, ISearchOptions } from '@core/interfaces';
import { AutocompleteInput } from '@shared/components/formСomponents/autocompleteInput';
import { apiService } from '@shared/services';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const GenreAutocomplete = ({form, fieldName}: IProps) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
