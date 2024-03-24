import { Router } from 'express';

import * as controller from '../controllers/experiences.js';

const experiencesRouter = Router();

experiencesRouter.get('/', controller.getExperiences);
experiencesRouter.get('/:id', controller.searchExperienceById);

experiencesRouter.post('/', controller.searchExperienceByParams);
experiencesRouter.post('/new', controller.addExperience);
experiencesRouter.post('/edit/:id', controller.editExperience);

export default experiencesRouter;
