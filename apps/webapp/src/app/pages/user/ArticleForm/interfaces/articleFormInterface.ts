import { IArticleFolder } from '@utils/interfaces';

export interface IArticleForm {
  url: string;
  isRedirecting: boolean;
  folder?: IArticleFolder;
}
