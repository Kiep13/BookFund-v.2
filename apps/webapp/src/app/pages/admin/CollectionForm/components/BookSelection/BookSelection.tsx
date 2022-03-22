import { Box } from '@mui/material';

import { DemoTable } from '@components/tables/DemoTable';
import { useAlerts } from '@utils/hooks';
import { IBook } from '@utils/interfaces';

import { COLUMNS, ERROR_BOOK_ALREADY_SELECTED, STYLES_BOOK_SELECTOR } from '../../constants';
import { BookAutocomplete } from '../BookAutocomplete';
import { IProps } from './propsInterface';

export const BookSelection = ({ form, autocompleteFieldName, dataFieldName }: IProps) => {
  const { addError } = useAlerts();

  const handleBookSelect = (book: IBook) => {
    const isExists = form.values[dataFieldName].map((item: IBook) => +item.id).includes(+book.id);
    if(isExists) {
      addError(ERROR_BOOK_ALREADY_SELECTED);
      return;
    }

    form.values[dataFieldName].push(book);
    form.validateForm();
  }

  const handleDeleteSelectedBook = (id: number) => {
    const filteredBookArray = form.values[dataFieldName].filter((book: IBook) => +book.id !== +id);

    form.setFieldValue(dataFieldName, filteredBookArray);
  }

  return (
    <>
      <Box sx={STYLES_BOOK_SELECTOR.autocomplete}>
        <BookAutocomplete
          form={form}
          fieldName={autocompleteFieldName}
          handleBookSelect={handleBookSelect}
        />
      </Box>
      <Box sx={STYLES_BOOK_SELECTOR.booksTable}>
        <DemoTable
          columns={COLUMNS}
          data={form.values[dataFieldName]}
          onDeleteClick={handleDeleteSelectedBook}/>
      </Box>
    </>
  )
}
