import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PageSizes } from '@core/enums';
import { IAuthor, IOption, ISearchOptions } from '@core/interfaces';
import { AutocompleteInput } from '@shared/components/formСomponents/autocompleteInput';
import { apiService } from '@shared/services';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const AuthorAutocomplete = ({form, fieldName}: IProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAuthors = useCallback(
    debounce(async () => {
      setLoading(true);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: searchTerm
      }
      const response = await apiService.getAuthors(searchOptions);

      const authorOptions = response.data.map((author: IAuthor) => {
        return {
          id: author.id,
          title: author.fullName || ''
        }
      });

      setOptions(authorOptions);
      setLoading(false);
    }, DELAY),
    []
  );

  useEffect(() => {
    getAuthors();
  }, [searchTerm]);

  return (
    <AutocompleteInput
      options={options}
      label={'Author'}
      loading={loading}
      form={form}
      fieldName={fieldName}
      handleTyping={setSearchTerm}/>
  );
}
