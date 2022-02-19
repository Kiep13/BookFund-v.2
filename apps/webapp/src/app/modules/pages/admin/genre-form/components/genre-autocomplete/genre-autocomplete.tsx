import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';

import { PageSizes } from '@core/enums';
import { IGenre, IOption, ISearchOptions } from '@core/interfaces';
import { AutocompleteInput } from '@shared/components/form-components/autocomplete-input';
import { apiService } from '@shared/services';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const GenreAutocomplete = (props: IProps) => {
  const { form, fieldName } = props;
  const initialOptions: IOption[] = [];

  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const [loading, setLoading] = useState(false);

  const getGenres = useCallback(
    debounce(async() => {
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
    <AutocompleteInput options={options}
                       label={'Genre'}
                       loading={loading}
                       form={form}
                       fieldName={fieldName}
                       handleTyping={setSearchTerm}/>
  );
}
