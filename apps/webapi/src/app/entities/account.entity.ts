import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Roles } from '@core/enums';

@Entity({
  name: 'account'
})
export class Account {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true
  })
  email: string;

  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string;

  @Column({
    name: 'surname',
    type: 'varchar'
  })
  surname: string;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true
  })
  image: string;

  @Column({
    name: 'activationLink',
    type: 'varchar'
  })
  activationLink: string;

  @Column({
    name: 'isActivated',
    type: 'boolean',
    default: false
  })
  isActivated: boolean;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'rolesEnum',
    enum: Roles,
    default: Roles.USER
  })
  role: Roles

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: true,
    insert: true
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
    update: true
  })
  updatedAt: Date;
}

