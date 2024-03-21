import { Router } from 'express';

import * as controller from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', controller.tryLogin);

authRouter.post('/logout', controller.tryLogout); // TODO

export default authRouter;
