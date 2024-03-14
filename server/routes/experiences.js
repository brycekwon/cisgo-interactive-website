"use strict";

import { Router } from 'express';

import * as controller from "../controllers/experienceController.js";

const experiencesRouter = Router();

experiencesRouter.get("/", controller.searchExperience);

experiencesRouter.get("/:id", controller.searchExperienceById);

experiencesRouter.post("/", controller.addExperience);

experiencesRouter.post("/:id", controller.editExperience);

export default experiencesRouter;
