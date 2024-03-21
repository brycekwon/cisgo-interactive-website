"use strict";

import { Router } from 'express';

import experienceModel from '../models/experiences.js';

const experienceRouter = Router();

experienceRouter.get("/", async function (req, res) {
	// TODO: GET /
	// Add support for querystring searching
	const experiences = await experienceModel.find({}).lean();
	res.json(experiences);
});

experienceRouter.get("/:id", async function (req, res) {
	const experience = await experienceModel.findById(req.params.id).lean();
	res.json(experience);
});

experienceRouter.post("/", async function(req, res) {
	// TODO: POST /
	// Add a new entry to the database
	res.sendStatus(204);
});

experienceRouter.post("/:id",async function(req, res) {
	// TODO: POST /:id
	// 1. Check that the user is permitted to edit the entry
	// 2.1. Success: Update the entry.   Inform the user of success.
	// 2.2. Failure: Don't change entry. Inform the user of failure.
	res.sendStatus(204);
});

export default experienceRouter;
