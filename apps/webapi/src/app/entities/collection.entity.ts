import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookEntity } from '@entities/book.entity';

@Entity({
  name: 'collection'
})
export class CollectionEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar'
  })
  title: string;

  @Column({
    name: 'subtitle',
    type: 'varchar'
  })
  subtitle: string;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true
  })
  image: string;

  @Column({
    name: 'description',
    type: 'text'
  })
  description: string;

  @ManyToMany(() => BookEntity, book => book.collections)
  @JoinTable({
    name: 'collection_book'
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
