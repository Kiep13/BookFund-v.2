import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const authors =  require('../seeds-json/authors.json');

export default class AddAuthors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('author', ['name', 'surname', 'image', 'biography'])
      .values([
        ...authors
      ])
      .execute()
  }
}
