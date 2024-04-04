import { Router } from 'express';

import * as controller from '../controllers/auth.js';
import loginLimiter from '../middleware/loginLimiter.js';
import verifyToken from '../middleware/verifyToken.js';

const authRouter = Router();

authRouter.get('/refresh', controller.tokenRefresh);

authRouter.post('/update', verifyToken, controller.updatePassword);
authRouter.post('/login', loginLimiter, controller.accountLogin);
authRouter.post('/logout', controller.accountLogout);

export default authRouter;
