import { Router } from 'express';

import { AuthProviders } from '@core/enums';
import { authController } from '@controllers/auth.controller';

const router = new Router();

router.get(`/${AuthProviders.GOOGLE}`, authController.signInViaGoogle);
router.get(`/${AuthProviders.FACEBOOK}`, authController.signInViaFacebook);
router.get(`/${AuthProviders.GITHUB}`, authController.singInViaGitHub);
router.get(`/logout`, authController.logout);

export default router;
