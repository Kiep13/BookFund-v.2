import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class createGenreTable1643309759038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'genre',
        columns: [
          {
            name: 'id',
            type: 'int8',
            isPrimary: true,
            isGenerated: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'parentId',
            type: 'int8',
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

      await queryRunner.createForeignKey('genre', new TableForeignKey({
        columnNames: ['parentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'genre',
        onDelete: 'CASCADE'
      }));

      await queryRunner.createIndex('genre', new TableIndex({
        name: 'TABLE_GENRE_INDEX_PARENT_ID',
        columnNames: ['parentId']
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
