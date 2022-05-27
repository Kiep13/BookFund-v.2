import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

import { environment } from '@environments/environment';

class FileService {
  private articlesFolder = path.resolve(__dirname, environment.articlesFolder);
  private booksFolder = path.resolve(__dirname, environment.booksFolder);
  private imagesFolder = path.resolve(__dirname, environment.imagesFolder);

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

  public async readFile(fileName): Promise<string> {
    const filePath = `${path.resolve(__dirname, environment.articlesFolder, fileName)}`;

    return fs.readFileSync(filePath).toString();
  }

  public async deleteFile(fileUrl: string, folderName: string): Promise<void> {
    const fileParts = fileUrl.split('/');
    const fileName = fileParts[fileParts.length - 1];

    const filePath = `${path.resolve(__dirname, folderName, fileName)}`;
    await fs.unlinkSync(filePath);
  }

  public checkFileStorageFolders() {
    const foldersForChecking: string[] = [this.articlesFolder, this.booksFolder, this.imagesFolder];

    foldersForChecking.forEach((folderPath: string) => {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    });
  }
}

export const fileService = new FileService();
