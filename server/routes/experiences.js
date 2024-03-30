import { Router } from 'express';

import * as controller from '../controllers/experiences.js';

const experiencesRouter = Router();

experiencesRouter.get('/', controller.searchExperiences);
experiencesRouter.get('/:id', controller.getExperience);

experiencesRouter.post('/add', controller.addExperience);   // TODO: add limiter on request?
experiencesRouter.post('/edit/:id', controller.editExperience);  // TODO: add auth middleware

export default experiencesRouter;
