import { Router } from 'express';

import experienceModel from '../models/experienceModel.js';

let experiencesRouter = Router();


/* GET home page. */
experiencesRouter.get("/", async function (req, res) {
	console.log(req.hostname);
	const experiences = await experienceModel.find({}).lean();
	res.json(experiences);
});

experiencesRouter.get("/:id", async function (req, res) {
	const experiences = await experienceModel.findById(req.params.id).lean();
	res.json(experiences);
});

experiencesRouter.post("/", async function(req, res) {
	// console.log(req.body);
	// do something with the data eventually
	res.sendStatus(204);
})

export default experiencesRouter;
