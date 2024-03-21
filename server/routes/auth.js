"use strict";

import { Router } from 'express';

import * as controller from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/login", controller.try_login);

authRouter.post("/logout", controller.try_logout); // TODO

export default authRouter;

