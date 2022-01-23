import { GENRES_MOCK } from '@mocks/genres.mock';
import AutocompleteMultiInput from '@shared/components/autocomplete-multi-input';

export default function GenresSelector() {
  const genres = GENRES_MOCK.map((genre) => {
    return {
      ...genre,
      title: genre.name
    }
  });

  return <AutocompleteMultiInput options={genres} label={'Genre'}/>
}
