import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const books =  require('../seeds-json/books.json');
const booksGenres = require('../seeds-json/book-genres.json');

export default class AddAuthors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('book', ['title', 'amountPages', 'year', 'image', 'authorId', 'description'])
      .values([
        ...books
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into('book_genre', ['bookId', 'genreId'])
      .values([
        ...booksGenres
      ])
      .execute();
  }
}
