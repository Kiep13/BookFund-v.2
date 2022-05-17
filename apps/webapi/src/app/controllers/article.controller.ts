import { Request, Response } from 'express';
import * as jsdom from 'jsdom';

const {JSDOM} = jsdom;

const POSSIBLE_ROOT_CLASS_NAMES = [
  'content',
  'content-inner',
  'container',
  'container-block',
  'main'
]

class ArticleController {
  public async createArticle(request: Request, response: Response, next: Function): Response {
    try {
      const url = request.body.url;

      const dom = await JSDOM.fromURL(url, {
        includeNodeLocations: true,
        storageQuota: 10000000
      });
      const document = dom.window.document;

      let content = '';

      for (let i = 0; i < POSSIBLE_ROOT_CLASS_NAMES.length; i++) {
        let result = document.getElementsByClassName(`${POSSIBLE_ROOT_CLASS_NAMES[i]}`);

        if(result.length && result[0]) {
          content = result[0].innerHTML;
          break;
        }

        result = document.getElementById(`${POSSIBLE_ROOT_CLASS_NAMES[i]}`);

        if(result) {
          content = result.innerHTML;
          break;
        }
      }

      if(!content) {
        throw new Error('Error due attempt to find page content');
      }

      const result = {
        by: document.location.origin,
        title: document.title,
        html: content
      }

      response.json(result);
    } catch (error) {
      next(error)
    }
  }
}

export const articleController = new ArticleController();
