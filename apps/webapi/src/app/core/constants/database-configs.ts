import { AccountEntity } from '@entities/account.entity';
import { ArticleEntity } from '@entities/article.entity';
import { AuthorEntity } from '@entities/author.entity';
import { BookEntity } from '@entities/book.entity';
import { CollectionEntity } from '@entities/collection.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';
import { FolderEntity } from '@entities/folder.entity';
import { GenreEntity } from '@entities/genre.entity';
import { environment} from '@environments/environment';

export const DATABASE_CONFIGS: any = {
  ...(environment.databaseUrl ? {url: environment.databaseUrl} : {}),
  type: 'postgres',
  database: environment.databaseName,
  port: environment.databasePort,
  synchronize: true,
  logging: false,
  username: environment.databaseUsername,
  password: environment.databasePassword,
  ...(environment.databaseUrl ? {extra: { ssl: true }} : {}),
  entities: [
    AccountEntity, ArticleEntity, AuthorEntity, GenreEntity, BookEntity, CollectionEntity, CommentEntity, FavoriteEntity, FolderEntity
  ]
}
