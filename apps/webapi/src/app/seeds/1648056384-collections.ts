import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const collections =  require('../seeds-json/collections.json');
const collectionsBooks = require('../seeds-json/collectons-books.json');

export default class AddCollections implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('collection', ['title', 'subtitle', 'image', 'description'])
      .values([
        ...collections
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into('collection_book', ['collectionId', 'bookId'])
      .values([
        ...collectionsBooks
      ])
      .execute();
  }
}
