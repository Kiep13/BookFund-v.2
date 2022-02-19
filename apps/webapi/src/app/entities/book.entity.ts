import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuthorEntity } from '@entities/author.entity';
import { GenreEntity } from '@entities/genre.entity';

@Entity({
  name: 'book'
})
export class BookEntity {
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
    name: 'amountPages',
    type: 'int'
  })
  amountPages: number;

  @Column({
    name: 'year',
    type: 'int'
  })
  year: number;

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

  @ManyToOne(() => AuthorEntity, author => author.books)
  @JoinColumn({
    name: 'authorId'
  })
  author: AuthorEntity;

  @ManyToMany(() => GenreEntity, genre => genre.books)
  @JoinTable({
    name: 'book_genre'
  })
  genres: GenreEntity[];

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

