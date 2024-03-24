import { Router } from 'express';

import programModel from '../models/programs.js';

const programRouter = Router();

programRouter.get('/', async (req, res) => {
  // TODO: GET /
  // Add support for querystring searching
  const programs = await programModel.find({}).lean();
  res.json(programs);
});

programRouter.get('/:id', async (req, res) => {
  const program = await programModel.findById(req.params.id).lean();
  res.json(program);
});
