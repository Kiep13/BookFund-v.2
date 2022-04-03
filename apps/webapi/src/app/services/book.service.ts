import { ILike } from 'typeorm';

import { connection } from '@core/connection';
import { SortDirections } from '@core/enums';
import { IBookForm, IListApiView, ISearchOptions } from '@core/interfaces';
import { BookEntity } from '@entities/book.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';

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

  public async getBooks(requestParams: ISearchOptions): Promise<IListApiView<BookEntity>> {
    const [books, count] = await connection.createQueryBuilder(BookEntity, 'book')
      .select([
        'book.id',
        'book.title',
        'book.amountPages',
        'book.year',
        'book.image',
        'book.description',
        'book.avgRate',
        'book.createdAt',
        'book.updatedAt'
      ])
      .leftJoinAndSelect('book.author', 'author')
      .orderBy({
        ...(
          requestParams.orderBy && requestParams.orderBy === 'authorFullName' ?
            {
              'author.surname': requestParams.order || SortDirections.ASC,
              'author.name': requestParams.order || SortDirections.ASC,
            } :
            {
              [requestParams.orderBy || 'book.title']: requestParams.order || SortDirections.ASC
            }
        )
      })
      .take(+requestParams.pageSize)
      .skip(+requestParams.pageSize * (+requestParams.page || 0))
      .where({
        title: ILike(`%${requestParams.searchTerm || ''}%`),
        ...( requestParams.keyId ? {
          author: {
            id: +requestParams.keyId
          }} : {})
      })
      .getManyAndCount();

    return {
      data: books,
      count: count
    }
  }

  public async updateBookAverageRate(bookId: number): Promise<void> {
    const book = await connection.manager.findOne(BookEntity, bookId, {
      relations: ['comments']
    });

    const sum = book.comments
      .map((comment: CommentEntity) => comment.rate)
      .reduce((rate: number, sum: number) => {
        return rate + sum;
      }, 0);

    const averageRate = +Number(sum / book.comments.length).toFixed(2);

    await connection.manager.update(BookEntity, bookId, {
      avgRate: averageRate
    });
  }

  public async isCommentedByUser(bookId: number, accountId: number): Promise<boolean> {
    const comment = await connection.manager.findOne(CommentEntity, {
      where: {
        account: {
          id: accountId
        },
        book: {
          id: bookId
        }
      }
    });

    return Boolean(comment);
  }

  public async getFavoriteStatus(bookId: number, accountId: number): Promise<FavoriteEntity> {
    return await connection.manager.findOne(FavoriteEntity, {
      select: ['id', 'status', 'bookmarkPage'],
      where: {
        account: {
          id: accountId
        },
        book: {
          id: bookId
        }
      }
    });
  }
}

export const bookService = new BookService();
