import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class createCommentTable1648222772458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'comment',
        columns: [
          {
            name: 'id',
            type: 'int8',
            isPrimary: true,
            isGenerated: true,
            isNullable: false
          },
          {
            name: 'bookId',
            type: 'int8',
            isNullable: false
          },
          {
            name: 'accountId',
            type: 'int8',
            isNullable: false
          },
          {
            name: 'rate',
            type: 'float',
            isNullable: false
          },
          {
            name: 'text',
            type: 'text',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
            default: 'now()'
          }
        ]
      }), true);

      await queryRunner.createForeignKey('comment', new TableForeignKey({
        columnNames: ['accountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('comment', new TableIndex({
        name: 'TABLE_COMMENTS_INDEX_ACCOUNT_ID',
        columnNames: ['accountId']
      }));

      await queryRunner.createForeignKey('comment', new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('comment', new TableIndex({
        name: 'TABLE_COMMENTS_INDEX_BOOK_ID',
        columnNames: ['bookId']
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
