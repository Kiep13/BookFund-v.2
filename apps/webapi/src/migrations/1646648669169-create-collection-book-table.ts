import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class createCollectionBookTable1646648669169 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'collection_book',
        columns: [
          {
            name: 'collectionId',
            type: 'int8',
            isNullable: false
          },
          {
            name: 'bookId',
            type: 'int8',
            isNullable: false
          }
        ]
      }), true);

      await queryRunner.createPrimaryKey('collection_book',  ['collectionId', 'bookId']);

      await queryRunner.createForeignKey('collection_book', new TableForeignKey({
        columnNames: ['collectionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'collection',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('collection_book', new TableIndex({
        name: 'TABLE_COLLECTION_BOOK_INDEX_COLLECTION_ID',
        columnNames: ['collectionId']
      }));

      await queryRunner.createForeignKey('collection_book', new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('collection_book', new TableIndex({
        name: 'TABLE_COLLECTION_BOOK_INDEX_BOOK_ID',
        columnNames: ['bookId']
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
