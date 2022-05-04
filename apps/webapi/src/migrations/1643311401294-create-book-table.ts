import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class createBookTable1643311401294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'book',
        columns: [
          {
            name: 'id',
            type: 'int8',
            isPrimary: true,
            isGenerated: true,
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'amountPages',
            type: 'int',
            isNullable: false
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'fileUrl',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'fileName',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false
          },
          {
            name: 'authorId',
            type: 'int8',
            isNullable: false
          },
          {
            name: 'avgRate',
            type: 'float',
            default: 0.0
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

      await queryRunner.createForeignKey('book', new TableForeignKey({
        columnNames: ['authorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'author',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('book', new TableIndex({
        name: 'TABLE_BOOK_INDEX_AUTHOR_ID',
        columnNames: ['authorId']
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
