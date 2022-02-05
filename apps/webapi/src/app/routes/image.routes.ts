import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { imageController } from '@controllers/image.controller';

const router = new Router();

router.post(`/${ApiRoutesModifiers.SAVE}`, imageController.saveImage);

export default router;
