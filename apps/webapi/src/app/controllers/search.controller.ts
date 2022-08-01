import { Request, Response } from 'express';

import { ResponseStatuses } from '@core/enums';
import { ICustomRequest, ISearchOptions, ISearchResults } from '@core/interfaces';
import { authorService } from '@services/author.service';
import { bookService } from '@services/book.service';
import { collectionService } from '@services/collection.service';

class SearchController {
  public async search(request: ICustomRequest, response: Response, next: Function): Promise<Response> {
    try {
      const requestParams: ISearchOptions = request.query;

      const [books, authors, collections] = await Promise.all([
        bookService.getBooks(requestParams),
        authorService.getAuthors(requestParams),
        collectionService.getCollections(requestParams)
      ]);

      const searchResult: ISearchResults = {
        books,
        authors,
        collections
      }

      return response.status(ResponseStatuses.STATUS_OK).json(searchResult);
    } catch (error) {
      next(error)
    }
  }
}

export const searchController = new SearchController();
