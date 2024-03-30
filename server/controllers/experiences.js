import mongoose from 'mongoose';

import experienceModel from '../models/experiences.js';


// TODO: add check for results
export async function searchExperiences(req, res) {
  const results = await experienceModel.find(
    req.query.q
      ? {
          'meta.isVisible': true,
          'location.country': new RegExp(req.query.q, 'i'),
        }
      : {
          'meta.isVisible': true,
        }
  /* ,'_id name email location' */);
  res.status(200).json(results);
}

export async function getExperience(req, res) {
  const id = req.params.id;
  if (!id || !mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      message: 'No entry found',
    });
  }

  const result = await experienceModel.findById(id);
  if (!result || !result.meta.isVisible) {
    return res.status(404).json({
      message: 'No entry found',
    });
  }

  res.status(200).json(result);
}

export async function addExperience(req, res) {
  const {
    isApproved,
    isVisible,
    contactVisible,
    name,
    email,
    affiliation,
    program,
    country,
    city,
    ongoing,
    startDate,
    endDate,
    institutions,
    partnerships,
    description,
  } = req.body;

  console.log('fe')
  if (![isApproved, isVisible, contactVisible].every((field) => typeof field === 'boolean')) {
    return res.status(400).json({
      status: 400,
      message: 'All boolean fields are required.',
    });
  }

  const stringFields = [name, email, affiliation, program, country, city, institutions, partnerships, description];
  if (!stringFields.every((field) => typeof field === 'string' && field.trim() !== '')) {
    return res.status(400).json({
      status: 400,
      message: 'All string fields are required',
    });
  }

  if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    return res.status(400).json({
      status: 400,
      message: 'All dates are requried',
    });
  }

  const newEntry = new experienceModel({
    meta: {
      isApproved: isApproved,
      isVisible: isVisible,
      contactVisible: contactVisible,
    },
    name: name,
    email: email,
    affiliation: affiliation,
    program: program,
    location: {
      country: country,
      city: city,
    },
    duration: {
      ongoing: ongoing,
      startDate: startDate,
      endDate: endDate,
    },
    external: {
      institutions: institutions,
      partnerships: partnerships,
    },
    description: description,
  });
  const status = await newEntry.save();
  if (!status) {
    return res.status(401).json({
      message: 'Could not save entry',
    });
  }

  return res.status(200).json({
    message: 'Entry added',
  });

}

/**
 * @route POST /experiences/edit/:id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function editExperience(req, res) {
  const id = req.params.id;
  if (!id || !mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      message: "No entry found"
    });
  }

  const {
    isApproved,
    isVisible,
    contactVisible,
    name,
    email,
    affiliation,
    program,
    country,
    city,
    ongoing,
    startDate,
    endDate,
    institutions,
    partnerships,
    description,
  } = req.body;

  const entry = await experienceModel.findById(id);
  if (!entry) {
    return res.status(401).json({
      message: 'Entry not found',
    });
  }

  entry.meta.isApproved = isApproved ?? entry.meta.isApproved;
  entry.meta.isVisible = isVisible ?? entry.meta.isVisible;
  entry.meta.contactVisible = contactVisible ?? entry.meta.contactVisible;
  entry.name = name ?? entry.name;
  entry.email = email ?? entry.email;
  entry.affiliation = affiliation ?? entry.affiliation;
  entry.program = program ?? entry.program;
  entry.location.country = country ?? entry.location.country;
  entry.location.city = city ?? entry.location.city;
  entry.duration.ongoing = ongoing ?? entry.duration.ongoing;
  entry.duration.startDate = startDate ?? entry.duration.startDate;
  entry.duration.endDate = endDate ?? entry.duration.endDate;
  entry.external.institutions = institutions ?? entry.external.institutions;
  entry.external.partnerships = partnerships ?? entry.external.partnerships;
  entry.description = description ?? entry.description;

  const status = await entry.save();
  if (!status) {
    return res.status(401).json({
      message: 'Could not change password',
    });
  }

  return res.status(200).json({
    message: 'Entry updated',
  });
}
