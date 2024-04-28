import bcrypt from 'bcryptjs';

import authModel from '../models/credentials.js';

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function tryLogin(req, res) {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(401).json({ valid: false, error: 'invalid request' });
  }

  const credentials = await authModel.find({ email: req.body.email }).lean();
  if (credentials.length === 0) {
    return res.status(401).send({
      valid: false,
      message: 'Credentials not found',
    });
  }

  bcrypt.compare(req.body.password, credentials[0].password, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }

    if (result) {
      res.status(200).json({ valid: true });
    } else {
      res.status(401).json({
        valid: false,
        message: 'Invalid credentials',
      });
    }
  });
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function tryLogout(req, res) {
  res.status(204);
}
