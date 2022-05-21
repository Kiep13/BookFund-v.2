import { IArticleFolder } from './articleFolderInterface';

export interface IArticle {
  id: number;
  title: string;
  content: string;
  isRedirecting: boolean;
  exactUrl: string;
  hostUrl: string;
  folder: IArticleFolder;
  createdAt: Date;
}
