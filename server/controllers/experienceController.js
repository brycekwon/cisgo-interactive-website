import experienceModel from '../models/experienceModel.js';

export async function searchExperience (req, res) {
	// TODO: GET /
	// Add support for querystring searching
	// console.log(req.hostname);
	const experiences = await experienceModel.find({}).lean();
	res.json(experiences);
}

export async function searchExperienceById (req, res) {
	const experiences = await experienceModel.findById(req.params.id).lean();
	res.json(experiences);
}

export async function addExperience(req, res) {
	// TODO: POST /
	// Add a new entry to the database
	res.sendStatus(204);
}

export async function editExperience(req, res) {
	// TODO: POST /:id
	// 1. Check that the user is permitted to edit the entry
	// 2.1. Success: Update the entry.   Inform the user of success.
	// 2.2. Failure: Don't change entry. Inform the user of failure.
	res.sendStatus(204);
}