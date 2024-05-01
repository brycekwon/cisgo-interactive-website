import { Router } from 'express';
import apicache from 'apicache';

import * as controller from '../controllers/experiences.js';
import verifyToken from '../middleware/verifyToken.js';

const experiencesRouter = Router();
const cache = apicache.middleware;

experiencesRouter.get('/', cache('5 minutes'), controller.searchExperiences);
experiencesRouter.get('/people', controller.getAllExperiences);
experiencesRouter.get('/:id', cache('5 minutes'), controller.getExperience);

experiencesRouter.post('/add', controller.addExperience);
experiencesRouter.post('/:id', verifyToken, controller.editExperience);

export default experiencesRouter;