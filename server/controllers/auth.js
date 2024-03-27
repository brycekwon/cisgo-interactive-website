import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authModel from '../models/credentials.js';
import { createAccessToken, createRefreshToken } from '../util/secretToken.js';

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function tryLogin(req, res) {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  try {
    const user = await authModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    const isAdmin = await bcrypt.compare(password, user.password);
    if (!isAdmin) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    const accessToken = createAccessToken(user, '2m');
    const refreshToken = createRefreshToken(user, '1d');

    res.cookie('jwt', refreshToken, {
      httpOnly: true,   // accessible only by web server
      secure: true,     // https
      maxAge: 1 * 24 * 60 * 60 * 1000,    // cookie expiry: set to match refresh token time
    });

    res.status(200).json({
      accessToken,
    });
  } catch (err) {
    // TODO: maybe build custom error handler?
    console.log(err);
  }
}

export async function refresh(req, res) {
  const { cookies } = req;
  if (!cookies?.jwt) {
    return res.status(401).json({
      mesage: 'Unauthorized',
    });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    const user = await authModel.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const accessToken = createAccessToken(user, '2m');
    res.json({ accessToken });
  });
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export function tryLogout(req, res) {
  const { cookies } = req;
  if (!cookies?.jwt) return res.status(204);    // BUG: hangs if cleared without cookies

  res.clearCookie('jwt', { httpOnly: true, secure: true });
  res.json({ message: 'Cookie cleared' });
}
