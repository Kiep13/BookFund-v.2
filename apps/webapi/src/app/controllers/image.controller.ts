import { Request, Response } from 'express';
import * as path from 'path';

import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { environment } from '@environments/environment';
import { imageService } from '@services/image.service';

class ImageController {
  public async saveImage(request: Request, response: Response, next: Function) {
    try {
      const imageName = await imageService.saveImage(request.files.image);

      return response.status(ResponseStatuses.STATUS_CREATED).send(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}/${imageName}`);
    } catch (error) {
      next(error)
    }
  }

  public async getImage(request: Request, response: Response, next: Function) {
    try {
      const imageName = request.params.name;
      const imagePath = path.join(__dirname, '..', '..', environment.imagesFolder, imageName);

      return response.sendFile(imagePath);
    } catch (error) {
      next(error)
    }
  }
}

export const imageController = new ImageController();
