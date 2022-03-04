import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const mainGenres =  require('../seeds-json/main-genres.json');
const subGenres =  require('../seeds-json/sub-genres.json');

export default class AddAuthors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('genre', ['name'])
      .values([
        ...mainGenres
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into('genre', ['name', 'parentId'])
      .values([
        ...subGenres
      ])
      .execute();
  }
}
