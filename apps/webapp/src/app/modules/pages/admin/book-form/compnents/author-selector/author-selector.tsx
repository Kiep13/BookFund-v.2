import * as React from 'react';

import { IAuthor, IOption } from '@core/interfaces';
import { AUTHORS_MOCK } from '@mocks/authors.mock';
import { AutocompleteInput } from '@shared/components/form-components/autocomplete-input';

export default function AuthorSelector() {
  const loading = false;
  const authorsOptions: IOption[] = AUTHORS_MOCK.map((author: IAuthor) => {
    return {
      title: `${author.surname} ${author.name}`,
      id: author.id
    }
  });

  // return <AutocompleteInput options={authorsOptions} label={'Author'} loading={loading}/>
  return <span>Here will be Author autocomplete soon</span>
}
