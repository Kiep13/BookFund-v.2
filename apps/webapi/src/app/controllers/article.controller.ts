import { Request, Response } from 'express';
import { URL } from 'url';
const read  = require('node-readability');

import { connection } from '@core/connection';
import { URL_CONTENT_FILE_EXTENSION } from '@core/constants';
import { ResponseStatuses } from '@core/enums';
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

        const fileName = await fileService.createFile(article.content, URL_CONTENT_FILE_EXTENSION);

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
}

export const articleController = new ArticleController();
