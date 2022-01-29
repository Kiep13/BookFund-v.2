import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

import { BookStatuses } from '../app/core/enums';

export class createFavoritesTable1643448703214 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'favorites',
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
            name: 'status',
            type: 'enum',
            enum: [BookStatuses.WANT_TO_READ, BookStatuses.IN_PROGRESS, BookStatuses.DONE],
            enumName: 'statusesEnum',
            isNullable: false
          },
          {
            name: 'bookmarkPage',
            type: 'int',
            isNullable: true
          },
          {
            name: 'rate',
            type: 'int',
            isNullable: true
          },
          {
            name: 'comment',
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

      await queryRunner.createForeignKey('favorites', new TableForeignKey({
        columnNames: ['accountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('favorites', new TableIndex({
        name: 'TABLE_FAVORITES_INDEX_ACCOUNT_ID',
        columnNames: ['accountId']
      }));

      await queryRunner.createForeignKey('favorites', new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('favorites', new TableIndex({
        name: 'TABLE_FAVORITES_INDEX_BOOK_ID',
        columnNames: ['bookId']
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
