import express from 'express';

import experienceModel from '../models/experienceModel.js';

let experiencesRouter = express.Router();


/* GET home page. */
experiencesRouter.get("/", async function (req, res) {
  const experiences = await experienceModel.find({}).lean();
  res.json(experiences);
});

experiencesRouter.get("/:id", async function (req, res) {
  const experiences = await experienceModel.find({}).lean();
  res.json(experiences);
});

export default experiencesRouter;
