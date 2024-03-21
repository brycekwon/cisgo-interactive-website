import { Router } from 'express';

import * as controller from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', controller.tryLogin);

authRouter.post('/logout', controller.tryLogout); // TODO

export default authRouter;
