import { connection } from '@core/connection';
import { BookStatuses } from '@core/enums';
import { AccountEntity } from '@entities/account.entity';
import { FavoriteEntity } from '@entities/favorite.entity';
import { BookEntity } from '@entities/book.entity';

class ReadingService {
  public async getActualReadingInfo(bookId: number, accountId: number): Promise<FavoriteEntity> {
    return await connection.createQueryBuilder(FavoriteEntity, 'favorite')
      .select([
        'favorite.id',
        'favorite.status',
        'favorite.bookmarkPage'
      ])
      .leftJoinAndSelect('favorite.book', 'book')
      .where({
        account: {
          id: accountId
        },
        book: {
          id: bookId
        }
      })
      .getOne();
  }

  public async createFavorite(bookId: number, account: AccountEntity): Promise<FavoriteEntity> {
    const book = await connection.createQueryBuilder(BookEntity, 'book')
      .where({
        id: bookId
      })
      .getOne();

    const favorite = new FavoriteEntity();
    favorite.book = book;
    favorite.account = account;
    favorite.status = BookStatuses.IN_PROGRESS;
    favorite.bookmarkPage = 1;

    console.log(favorite);

    await connection.manager.save(favorite);

    return favorite;
  }

  public async updateFavoriteStatus(favorite: FavoriteEntity): Promise<FavoriteEntity> {
    favorite.status = BookStatuses.IN_PROGRESS;
    favorite.bookmarkPage = 1;

    await connection.manager.update(FavoriteEntity, favorite.id, favorite);

    return favorite;
  }
}

export const readingService = new ReadingService();
