import { Router } from 'express';

import programModel from '../models/programsModel';

const programRouter = Router();

programRouter.get('/', async function(req, res) {
  // TODO: GET /
  // Add support for querystring searching
  const programs = await programModel.find({}).lean();
  res.json(programs);
});

programRouter.get('/:id', async function(req, res) {
  const program = await programModel.findById(req.params.id).lean();
  res.json(program);
});
