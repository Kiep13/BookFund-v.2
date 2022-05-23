import { Request, Response } from 'express';
import { URL } from 'url';
const read  = require('node-readability');

import { connection } from '@core/connection';
import { ERROR_NO_ACCESS_FOLDER, URL_CONTENT_FILE_EXTENSION } from '@core/constants';
import { ApiRoutes, ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView, ISearchOptions } from '@core/interfaces';
import { environment } from '@environments/environment';
import { ApiError } from '@exceptions/api-error';
import { ParseError } from '@exceptions/parse-error';
import { ArticleEntity } from '@entities/article.entity';
import { fileService } from '@services/file.service';

class ArticleController {
  public async createArticle(request: Request, response: Response, next: Function): Response {
    try {
      const url = new URL(request.body.url);

      read(url.href, async function(err, article, meta) {
        if(!article.content || err) {
          return next(ParseError.ParseFailed());
        }

        const fileName = await fileService.createFile(article.content.replaceAll('data-cfsrc', 'src'), URL_CONTENT_FILE_EXTENSION);

        const articleEntity = new ArticleEntity();
        articleEntity.title = article.title;
        articleEntity.isRedirecting = request.body.isRedirecting;
        articleEntity.exactUrl = url.href;
        articleEntity.hostUrl = url.hostname;
        articleEntity.folder = request.body.folder;
        articleEntity.contentFileUrl = fileName;

        await connection.manager.save(articleEntity);

        article.close();

        return response.status(ResponseStatuses.STATUS_CREATED).json(articleEntity);
      });
    } catch (error) {
      next(error)
    }
  }

  public async updateArticle(request: Request, response: Response, next: Function): Response {
    try {
      const articleId = +request.params.id;

      const article = await connection.manager.findOne(ArticleEntity, articleId);

      article.folder = request.body.folder;
      article.isRedirecting = request.body.isRedirecting;

      await connection.manager.update(ArticleEntity, articleId, article);

      return response.status(ResponseStatuses.STATUS_OK).json(article);
    } catch (error) {
      next(error);
    }
  }

  public async getArticle(request: Request, response: Response, next: Function): Response {
    try {
      const articleId = +request.params.id;
      const accountId = +request.account.id;

      const article = await connection.manager.getRepository(ArticleEntity).findOne({
        relations: ['folder', 'folder.account'],
        where: {
          id: articleId
        }
      });

      if(!article || +article.folder.account.id !== accountId) {
        return next(ApiError.BadRequest(ERROR_NO_ACCESS_FOLDER));
      }

      article.content = await fileService.readFile(article.contentFileUrl);
      delete article.folder.account;

      return response.status(ResponseStatuses.STATUS_OK).json(article);
    } catch (error) {
      next(error)
    }
  }

  public async getArticles(request: Request, response: Response, next: Function): Response {
    try {
      const requestParams: ISearchOptions = request.query;

      const baseRequestConfigurations = () => connection.createQueryBuilder(ArticleEntity, 'article')
        .leftJoinAndSelect('article.folder', 'folder')
        .addSelect('article.id', 'id')
        .addSelect('article.title', 'title')
        .addSelect('article.isRedirecting', 'isRedirecting')
        .addSelect('article.exactUrl', 'exactUrl')
        .addSelect('article.hostUrl', 'hostUrl')
        .addSelect('article.createdAt', 'createdAt')
        .orderBy(`\"${requestParams.orderBy || 'createdAt'}\"`, requestParams.order || SortDirections.DESC)
        .where(`\"title\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
        .andWhere(`\"folder\".\"id\" = :accountId`, {accountId: +requestParams.keyId});

      const articles = await baseRequestConfigurations()
        .limit(+requestParams.pageSize)
        .offset(+requestParams.pageSize * (+requestParams.page || 0))
        .getRawMany();

      const count = await baseRequestConfigurations().getCount();

      const result: IListApiView<ArticleEntity> = {
        data: articles,
        count: count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteArticle(request: Request, response: Response, next: Function): Response {
    try {
      const articleId = +request.params.id;

      const articleEntity = await connection.manager.findOne(ArticleEntity, articleId);
      await fileService.deleteFile(articleEntity.contentFileUrl, environment.articlesFolder);

      await connection.manager.remove(articleEntity);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const articleController = new ArticleController();
