import { PageSizes } from "@core/enums";
import { useEffect, useState } from 'react';
import * as React from 'react';

import { IGenre, IOption, ISearchOptions } from '@core/interfaces';
import AutocompleteInput from '@shared/components/form-components/autocomplete-input';
import { apiService } from '@shared/services';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const GenreAutocomplete = (props: IProps) => {
  let timer: ReturnType<typeof setTimeout>;
  const initialOptions: IOption[] = [];
  const { form, fieldName } = props;

  const [options, setOptions] = useState(initialOptions);
  const [loading, setLoading] = useState(false);

  const getGenres = async(searchTerm: string) => {
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
  }

  useEffect(() => {
    const searchTerm = '';

    getGenres(searchTerm);
  }, []);

  const handleTyping = (searchTerm: string) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      getGenres(searchTerm);
    }, DELAY);
  }

  return (
    <AutocompleteInput options={options} label={'Genre'}
                       loading={loading} form={form}
                       fieldName={fieldName} handleTyping={handleTyping}/>
  );
}
