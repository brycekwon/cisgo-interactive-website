import { Router } from 'express';

import * as controller from '../controllers/auth.js';
import loginLimiter from '../middleware/loginLimiter.js';

const authRouter = Router();

authRouter.post('/login', loginLimiter, controller.accountLogin);
authRouter.post('/logout', controller.accountLogout);
authRouter.get('/refresh', controller.tokenRefresh);

export default authRouter;
