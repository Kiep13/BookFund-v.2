import { AccountEntity } from '@entities/account.entity';
import { FolderEntity } from '@entities/folder.entity';
import { connection } from '@core/connection';
import { DEFAULT_FOLDER_NAME } from '@core/constants';
import { IArticleFolder } from '@core/interfaces';

class FolderService {
  public buildFolderFromBody(requestBody: IArticleFolder): FolderEntity {
    const folder: FolderEntity = new FolderEntity();
    folder.name = requestBody.name;

    return folder;
  }

  public async createDefaultFolder(account: AccountEntity) {
    const folder = new FolderEntity();
    folder.name = DEFAULT_FOLDER_NAME;
    folder.account = account;

    return await connection.manager.save(folder);
  }
}

export const folderService = new FolderService();
