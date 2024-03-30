import { Router } from 'express';
import apicache from 'apicache';

import * as controller from '../controllers/experiences.js';

const experiencesRouter = Router();
const cache = apicache.middleware;

experiencesRouter.get('/', cache('5 minutes'), controller.searchExperiences);
experiencesRouter.get('/:id', cache('5 minutes'), controller.getExperience);

experiencesRouter.post('/add', controller.addExperience);   // TODO: add limiter on request?
experiencesRouter.post('/edit/:id', controller.editExperience);  // TODO: add auth middleware

export default experiencesRouter;
