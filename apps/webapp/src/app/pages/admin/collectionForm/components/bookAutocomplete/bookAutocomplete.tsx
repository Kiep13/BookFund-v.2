import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { AutocompleteInput } from '@components/formСomponents/autocompleteInput';
import { PageSizes } from '@utils/enums';
import { IBook, IOption, ISearchOptions } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

import { DELAY } from '../../constants';
import { IProps } from './props.interface';

export const BookAutocomplete = ({form, fieldName, handleBookSelect}: IProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const api = useApi();

  const handleBookSelection = (option: IOption | null) => {
    if(!option) {
      return;
    }

    const selectedBookPosition = books.findIndex((book: IBook) => book.id === option.id);
    const selectedBook = books[selectedBookPosition];
    selectedBook.authorFullName = `${selectedBook?.author.name} ${selectedBook?.author.surname}`;

    handleBookSelect(selectedBook);

    form.setFieldValue(fieldName, null);
    setSearchTerm('');
  }

  const getBooks = useCallback(
    debounce(async (search: string) => {
      setLoading(true);

      const searchOptions: ISearchOptions = {
        pageSize: PageSizes.Fifty,
        searchTerm: search
      }
      const response = await api.getBooks(searchOptions);

      setBooks(response.data);

      const bookOptions = response.data.map((book: IBook) => {
        return {
          id: book.id,
          title: book.title
        }
      });

      setOptions(bookOptions);
      setLoading(false);
    }, DELAY),
    []
  );

  useEffect(() => {
    getBooks(searchTerm);
  }, [searchTerm]);

  return (
    <AutocompleteInput
      options={options}
      label={'Type a book title'}
      loading={loading}
      form={form}
      fieldName={fieldName}
      handleTyping={setSearchTerm}
      handleSelecting={handleBookSelection}/>
  );
}
