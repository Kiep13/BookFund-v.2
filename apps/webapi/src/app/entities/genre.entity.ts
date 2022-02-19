import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookEntity } from '@entities/book.entity';

@Entity({
  name: 'genre'
})
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

  @ManyToOne(() => GenreEntity, genre => genre.subGenres)
  @JoinColumn({
    name: 'parentId'
  })
  parentGenre: GenreEntity;

  @OneToMany(() => GenreEntity, genre => genre.parentGenre)
  subGenres: GenreEntity[];

  @ManyToMany(() => BookEntity, book => book.genres)
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
