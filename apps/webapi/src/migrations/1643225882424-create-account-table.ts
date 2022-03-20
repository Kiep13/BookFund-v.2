import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { AuthProviders, Roles } from '../app/core/enums';

export class createAccountTable1643225882424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'int8',
            isPrimary: true,
            isGenerated: true,
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'surname',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'provider',
            type: 'enum',
            enum: [AuthProviders.GOOGLE, AuthProviders.GITHUB, AuthProviders.FACEBOOK],
            enumName: 'providersEnum',
            isNullable: false
          },
          {
            name: 'role',
            type: 'enum',
            enum: [Roles.USER, Roles.MODERATOR, Roles.ADMIN],
            enumName: 'rolesEnum',
            isNullable: false
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
