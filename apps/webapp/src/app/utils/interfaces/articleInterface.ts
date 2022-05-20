import { IArticleFolder } from './articleFolderInterface';

export interface IArticle {
  title: string;
  content: string;
  isRedirecting: boolean;
  exactUrl: string;
  hostUrl: string;
  folder: IArticleFolder;
}
