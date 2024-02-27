"use strict";

import { Router } from 'express';

import experienceModel from '../models/experiences.js';

const experiencesRouter = Router();

experiencesRouter.get("/", async function (req, res) {
	// TODO: GET /
	// Add support for querystring searching
	// console.log(req.hostname);
	const experiences = await experienceModel.find({}).lean();
	res.json(experiences);
});

experiencesRouter.get("/:id", async function (req, res) {
	const experiences = await experienceModel.findById(req.params.id).lean();
	res.json(experiences);
});

experiencesRouter.post("/", async function(req, res) {
	// TODO: POST /
	// Add a new entry to the database
	res.sendStatus(204);
});

experiencesRouter.post("/:id",async function(req, res) {
	// TODO: POST /:id
	// 1. Check that the user is permitted to edit the entry
	// 2.1. Success: Update the entry.   Inform the user of success.
	// 2.2. Failure: Don't change entry. Inform the user of failure.
	res.sendStatus(204);
});

export default experiencesRouter;
