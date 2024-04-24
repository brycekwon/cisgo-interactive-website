import { isValidObjectId } from 'mongoose';
import asyncHandler from 'express-async-handler';

import experienceModel from '../models/experiences.js';
import { isValidExperience } from '../util/validExperience.js';

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
    query['location.country'] = new RegExp(req.query.q.trim().match(/[a-zA-Z0-9 -_\.]+/), 'i');
  }

  const results = await experienceModel.find(query).lean();
  if (!results?.length) {
    return res.status(200).json([]);
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

// ple?tab=${activeTab}&sortBy=${activeSort}`)
//       // switch(activeTab) {
      //   case 'Visible':
      //     data = data.filter(experience => experience.meta.isVisible && experience.meta.isApproved);
      //     break;
      //   case 'Hidden':
      //     data = data.filter(experience => !experience.meta.isVisible && experience.meta.isApproved);
      //     break;
      //   case 'Unapproved':
      //     data = data.filter(experience => !experience.meta.isApproved);
      //     break;
      //   default:
      //     break;
      // }
export const getAllExperiences = asyncHandler(async (req, res) => {
  const activeTab = req.query.tab.trim();
  const activeSort = req.query.sortBy.trim();
  if (!activeSort || !activeSort) {
    return res.status(401).json([]);
  }

  let query = {};
  if (activeTab === 'Visible') {
    query = {
      'meta.isVisible': true,
      'meta.isApproved': true,
    }
  } else if (activeTab === 'Hidden') {
    query = {
      'meta.isVisible': false,
      'meta.isApproved': true,
    }
  } else if (activeTab === 'Unapproved') {
    query = {
      'meta.isApproved': false,
    }
  }
  console.log(query)

  const results = await experienceModel.find(query).lean();
  if (!results?.length) {
    return res.status(200).json([]);
  }

  if (activeSort === 'Country') {
    results.sort((a, b) => (a.location.country > b.location.country) ? 1 : -1);
  } else if (activeSort === 'Name') {
    results.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  return res.status(200).json(results);
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
  if (!isValidExperience(req.body)) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  const newEntry = new experienceModel(req.body);
  const status = await newEntry.save();
  if (!status) {
    return res.status(500).json({
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

  if (!isValidExperience(req.body)) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  const status = await experienceModel.findByIdAndUpdate(id, req.body);
  if (!status) {
    return res.status(500).json({
      message: 'Could not save entry',
    });
  }

  return res.status(200).json({
    message: 'Entry updated',
  });
});
