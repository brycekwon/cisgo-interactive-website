import { Router } from 'express';

import * as controller from '../controllers/experiences.js';
import verifyToken from '../middleware/verifyToken.js';

const experiencesRouter = Router();

experiencesRouter.get('/', controller.getExperiences);
experiencesRouter.get('/:id', controller.searchExperienceById);

experiencesRouter.post('/', controller.searchExperienceByParams); 
experiencesRouter.post('/:id', verifyToken, controller.editExperience);
experiencesRouter.post('/new', controller.addExperience);
experiencesRouter.post('/edit/:id', controller.editExperience);

export default experiencesRouter;
