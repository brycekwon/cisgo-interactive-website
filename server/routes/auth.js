import { Router } from 'express';

import * as controller from '../controllers/auth.js';
import loginLimiter from '../middleware/loginLimiter.js';

const authRouter = Router();

authRouter.route('/login').post(loginLimiter, controller.tryLogin);
authRouter.post('/logout', controller.tryLogout);
authRouter.get('/refresh', controller.refresh);

export default authRouter;
