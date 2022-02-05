import { Request, Response } from 'express';

import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { environment } from '@environments/environment';
import { imageService } from '@services/image.service';

class ImageController {
  public async saveImage(request: Request, response: Response, next: Function) {
    const imageName = await imageService.saveImage(request.files.image);

    return response.status(ResponseStatuses.STATUS_CREATED).send(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}${imageName}`);
  }
}

export const imageController = new ImageController();
