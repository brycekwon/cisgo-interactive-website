import { isValidObjectId } from 'mongoose';
import asyncHandler from 'express-async-handler';

import experienceModel from '../models/experiences.js';
import { isValidDate } from '../util/validDate.js';

// INFO: does not check for duplicate OID (chance < 1 in 1.8x10^19)

/**
 * Searches the experiences database for entries matching the provided queries
 *
 * @route GET /experiences
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const searchExperiences = asyncHandler(async (req, res) => {
  const query = {
    'meta.isApproved': true,
    'meta.isVisible': true,
  };
  if (req.query.q) {
    query['location.country'] = new RegExp(req.query.q, 'i');
  }

  const results = await experienceModel.find(query).lean();
  if (!results?.length) {
    return res.status(200).json({
      message: 'No entries found',
    });
  }

  return res.status(200).json(results);
});

/**
 * Searches the experiences database for entries based on ID
 *
 * @route GET /experiences/:id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const getExperience = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  const query = {
    '_id': id,
    'meta.isApproved': true,
    'meta.isVisible': true,
  };

  const results = await experienceModel.findOne(query).lean();
  if (!results) {
    return res.status(200).json({
      message: 'No entry found',
    });
  }

  res.status(200).json(results);
});

/**
 * Adds a new entry to the experiences database
 * TODO: checks before saving into database
 *
 * @route POST /experiences/add/:id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const addExperience = asyncHandler(async (req, res) => {
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
    institutions,
    partnerships,
    description,
  } = req.body;

  let { startDate, endDate } = req.body;

  const boolFields = [isApproved, isVisible, contactVisible, ongoing];
  if (!boolFields.every((field) => typeof field === 'boolean')) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  const stringFields = [name, email, affiliation, program, country, city, institutions, partnerships, description];
  if (!stringFields.every((field) => typeof field === 'string' && field.trim() !== '')) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  if (ongoing) {
    startDate = "";
    endDate = "";
  } else if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    return res.status(400).json({
      message: 'All fields are requried',
    });
  } else if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).json({
      message: 'Invalid request',
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
});

/**
 * Edit existing entry in experiences database by ID
 * TODO: checks before saving into database
 *
 * @route POST /experiences/edit/:id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export const editExperience = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  const entry = await experienceModel.findById(id);
  if (!entry) {
    return res.status(401).json({
      message: 'Entry not found',
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
});
