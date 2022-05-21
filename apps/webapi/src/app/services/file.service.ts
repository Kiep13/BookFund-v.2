import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

import { environment } from '@environments/environment';

class FileService {
  public async createFile(content: string, extension: string): Promise<string> {
    const fileName = `${uuid.v4()}.${extension}`;
    const filePath = `${path.resolve(__dirname, environment.articlesFolder, fileName)}`;

    await fs.appendFileSync(filePath, content);

    return fileName;
  }

  public async saveFile(file): Promise<string> {
    const fileName = `${uuid.v4()}.pdf`;

    const filePath = `${path.resolve(__dirname, environment.booksFolder, fileName)}`;

    await file.mv(filePath);

    return fileName;
  }

  public async deleteFile(fileUrl: string): Promise<void> {
    const fileParts = fileUrl.split('/');
    const fileName = fileParts[fileParts.length - 1];

    const filePath = `${path.resolve(__dirname, environment.booksFolder, fileName)}`;
    await fs.unlinkSync(filePath);
  }
}

export const fileService = new FileService();
