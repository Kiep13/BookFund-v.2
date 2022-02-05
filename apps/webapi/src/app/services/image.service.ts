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
}

export const imageService = new ImageService();
