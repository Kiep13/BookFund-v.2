import { IBookForm } from '@core/interfaces';
import { BookEntity } from '@entities/book.entity';

class BookService {
  public buildBookFromBody(requestBody: IBookForm): BookEntity {
    const book: BookEntity = new BookEntity();

    book.title = requestBody.title;
    book.amountPages = requestBody.amountPages;
    book.year = requestBody.year;
    book.author = requestBody.author;
    book.genres = requestBody.genres;
    book.description = requestBody.description;
    book.image = requestBody.imageUrl;

    return book;
  }
}

export const bookService = new BookService();
