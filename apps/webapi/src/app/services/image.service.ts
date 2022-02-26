import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

import { environment } from '@environments/environment';

class ImageService {
  public async saveImage(file): Promise<string> {
    const fileNameParts = file.name.split('.');
    const expansion = fileNameParts[fileNameParts.length - 1];
    const fileName = `${uuid.v4()}.${expansion}`;

    const filePath = `${path.resolve(__dirname, '..', '..', environment.imagesFolder, fileName)}`;

    await file.mv(filePath);
    return fileName;
  }

  public async deleteImage(fileUrl: string): Promise<void> {
    const fileParts = fileUrl.split('/');
    const fileName = fileParts[fileParts.length - 1];

    const filePath = `${path.resolve(__dirname, '..', '..', environment.imagesFolder, fileName)}`;
    await fs.unlinkSync(filePath);
  }
}

export const imageService = new ImageService();
