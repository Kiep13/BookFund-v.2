import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class createBookGenreTable1643448274184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'book_genre',
        columns: [
          {
            name: 'bookId',
            type: 'int8',
            isNullable: false
          },
          {
            name: 'genreId',
            type: 'int8',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }), true);

      await queryRunner.createPrimaryKey('book_genre',  ['bookId', 'genreId']);

      await queryRunner.createForeignKey('book_genre', new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('book_genre', new TableIndex({
        name: 'TABLE_BOOK_GENRE_INDEX_BOOK_ID',
        columnNames: ['bookId']
      }));

      await queryRunner.createForeignKey('book_genre', new TableForeignKey({
        columnNames: ['genreId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'genre',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('book_genre', new TableIndex({
        name: 'TABLE_BOOK_GENRE_INDEX_GENRE_ID',
        columnNames: ['genreId']
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
