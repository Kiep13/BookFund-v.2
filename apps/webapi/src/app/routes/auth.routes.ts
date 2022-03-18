import { Router } from 'express';

import { AuthProviders } from '@core/enums';
import { authController } from '@controllers/auth.controller';

const router = new Router();

router.get(`/${AuthProviders.GOOGLE}`, authController.signInViaGoogle);

export default router;
