import { DemoTable } from '@features/demoTable';
import { Box } from '@mui/material';

import { IBook } from '@core/interfaces';

import { COLUMNS, STYLES_BOOK_SELECTOR } from '../../constants';
import { BookAutocomplete } from '../bookAutocomplete';
import { IProps } from './props.interface';

export const BookSelection = ({ form, autocompleteFieldName, dataFieldName }: IProps) => {
  const handleBookSelect = (book: IBook) => {
    form.values[dataFieldName].push(book);
    form.validateForm();
  }

  const handleDeleteSelectedBook = () => {

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
