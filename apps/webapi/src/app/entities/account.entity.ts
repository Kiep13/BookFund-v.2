import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';
import { FolderEntity } from '@entities/folder.entity';
import { AuthProviders, Roles } from '@core/enums';

@Entity({
  name: 'account'
})
export class AccountEntity {
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
    name: 'provider',
    type: 'enum',
    enumName: 'providersEnum',
    enum: AuthProviders
  })
  provider: AuthProviders;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'rolesEnum',
    enum: Roles,
    default: Roles.USER
  })
  role: Roles;

  @OneToMany(() => FavoriteEntity, favorite => favorite.account)
  favorites: FavoriteEntity[];

  @OneToMany(() => CommentEntity, comment => comment.book)
  comments: CommentEntity[];

  @OneToMany(() => FolderEntity, folder => folder.account)
  folders: FolderEntity[];

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: true,
    insert: true,
    default: new Date()
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
    update: true,
    default: new Date()
  })
  updatedAt: Date;
}

