import { AccountEntity } from '@entities/account.entity';
import { FolderEntity } from '@entities/folder.entity';
import { connection } from '@core/connection';
import { DEFAULT_FOLDER_NAME } from '@core/constants';

class FolderService {
  public async createDefaultFolder(account: AccountEntity) {
    const folder = new FolderEntity();
    folder.name = DEFAULT_FOLDER_NAME;
    folder.account = account;

    return await connection.manager.save(folder);
  }
}

export const folderService = new FolderService();
