import { connection } from  '@core/connection';
import { SortDirections } from '@core/enums';
import { IAuthorForm, IListApiView, ISearchOptions } from '@core/interfaces';
import { AuthorEntity } from '@entities/author.entity';

class AuthorService {
  public buildAuthorFromBody(requestBody: IAuthorForm): AuthorEntity {
    const author: AuthorEntity = new AuthorEntity();

    author.name = requestBody.name;
    author.surname = requestBody.surname;
    author.biography = requestBody.biography;
    author.image = requestBody.imageUrl;

    return author;
  }

  public async getAuthors(requestParams: ISearchOptions): Promise<IListApiView<AuthorEntity>> {
    const baseRequestConfigurations = () => connection.createQueryBuilder(AuthorEntity, 'author')
      .leftJoinAndSelect('author.books', 'book')
      .groupBy('author.id')
      .select('COUNT(book.id)', 'amountBooks')
      .addSelect('CONCAT(author.name, \' \', author.surname)', 'fullName')
      .addSelect('author.id', 'id')
      .addSelect('author.name', 'name')
      .addSelect('author.surname', 'surname')
      .addSelect('author.image', 'image')
      .addSelect('author.createdAt', 'createdAt')
      .addSelect('author.updatedAt', 'updatedAt');

    const authors = await baseRequestConfigurations()
      .orderBy(`\"${requestParams.orderBy || 'fullName'}\"`, requestParams.order || SortDirections.ASC)
      .limit(+requestParams.pageSize)
      .offset(+requestParams.pageSize * +requestParams.page)
      .where(`\"name\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
      .orWhere(`\"surname\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
      .getRawMany();

    const count = await baseRequestConfigurations()
      .orderBy(`\"${requestParams.orderBy || 'fullName'}\"`, requestParams.order || SortDirections.ASC)
      .where(`\"name\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
      .orWhere(`\"surname\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
      .getCount();

    return {
      data: authors,
      count: count
    }
  }
}

export const authorService = new AuthorService();
