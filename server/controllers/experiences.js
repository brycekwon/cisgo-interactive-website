import experienceModel from '../models/experiences.js';

export async function getExperiences(req, res) {
  const experiences = await experienceModel.find({}).lean();
  res.json(experiences);
}

/**
 * Searches the experience database. Optionally narrows search by location.
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function searchExperienceByParams(req, res) {
  // TODO: GET /
  // Add support for querystring searching
  // console.log(req.hostname);

  // const experiences = await (req.body.query
  // 	? experienceModel.find({location: req.body.query})
  // 	: experienceModel.find({})
  // );
  let experiences;
  if (!req.body.query) {
    experiences = await experienceModel.find({}).lean();
  } else {
    experiences = await experienceModel.find({
      'location.country': new RegExp(req.body.query.slice(100).match(/[ a-zA-Z0-9\-\.]+/)[0], 'i'),
    });
  }
  res.json(experiences);
}

export async function searchExperienceById(req, res) {
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
