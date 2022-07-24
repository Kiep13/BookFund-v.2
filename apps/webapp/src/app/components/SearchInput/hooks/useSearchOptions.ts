import { useNavigate } from 'react-router-dom';

import { IAuthor, IBook, ICollection, IOption, ISearchResults } from '@utils/interfaces';
import { BaseRoutePaths } from '@utils/enums';

import { GroupByOptions } from '../enums';

export const useSearchOptions = () => {
  const navigate = useNavigate();

  const transformSearchResultsToOptions = (results: ISearchResults): IOption[] => {
    return [
      ...(results.books.data.map((book: IBook) => {
        return {
          id: book.id,
          title: book.title,
          groupBy: GroupByOptions.BOOKS
        }
      })),
      ...(results.authors.data.map((author: IAuthor) => {
        return {
          id: author.id,
          title: `${author.name} ${author.surname}`,
          groupBy: GroupByOptions.AUTHORS
        }
      })),
      ...(results.collections.data.map((collection: ICollection) => {
        return {
          id: collection.id,
          title: collection.title,
          groupBy: GroupByOptions.COLLECTIONS
        }
      })),
    ]
  }

  const solveUrlBasedOnType = (groupByType: string): BaseRoutePaths => {
    switch(groupByType) {
      case GroupByOptions.BOOKS: return BaseRoutePaths.BOOK;
      case GroupByOptions.AUTHORS: return BaseRoutePaths.AUTHOR;
      case GroupByOptions.COLLECTIONS: return BaseRoutePaths.COLLECTION;
      default: return BaseRoutePaths.SEARCH;
    }
  }

  const handleSearchOptionSelect = (option: IOption) => {
    if(!option || !option.groupBy) {
       return;
    }

    const entityRoutePath = solveUrlBasedOnType(option.groupBy);

    navigate(`${entityRoutePath}/${option.id}`);
  }

  const navigateToSearchPage = (searchTerm: string): void => {
    navigate(`${BaseRoutePaths.SEARCH}/${searchTerm}`);
  }

  return {
    transformSearchResultsToOptions,
    handleSearchOptionSelect,
    navigateToSearchPage
  }
}
