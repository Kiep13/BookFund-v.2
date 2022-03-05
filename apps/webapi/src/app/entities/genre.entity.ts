import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren, TreeParent
} from 'typeorm';

import { BookEntity } from '@entities/book.entity';

@Entity({
  name: 'genre'
})
@Tree('nested-set')
export class GenreEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string;

  @JoinColumn()
  @TreeParent()
  parent: GenreEntity;

  @TreeChildren()
  subGenres: GenreEntity[];

  @ManyToMany(() => BookEntity, book => book.genres, {
    cascade: true
  })
  books: BookEntity[];

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
