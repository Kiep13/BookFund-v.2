import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { AutocompleteInput } from '@components/formСomponents/AutocompleteInput';
import { PageSizes } from '@utils/enums';
import { IAuthor, IOption, ISearchOptions } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

import { DELAY } from '../../constants';
import { IProps } from './propsInterface';

export const AuthorAutocomplete = ({form, fieldName}: IProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const api = useApi();

  const getAuthors = useCallback(
    debounce(async (search: string) => {
      setLoading(true);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: search
      }
      const response = await api.getAuthors(searchOptions);

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
    getAuthors(searchTerm);
  }, [searchTerm]);

  return (
    <AutocompleteInput
      options={options}
      label='Author'
      loading={loading}
      form={form}
      fieldName={fieldName}
      handleTyping={setSearchTerm}/>
  );
}
