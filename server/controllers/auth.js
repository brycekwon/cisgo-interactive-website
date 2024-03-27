import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createSecretToken } from '../util/secretToken.js';
import authModel from '../models/credentials.js';

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function tryLogin(req, res) {
  const { email, password } = req.body;
  if (email == undefined || password == undefined) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  
  try {
    const user = await authModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      {
        'UserInfo': {
          'username': user.email,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' },
    )

    const refreshToken = jwt.sign(
      {
        'username': user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    )


    res.cookie('jwt', refreshToken, {
      httpOnly: true,     // accessible only by web server
      secure: true,       // https
      maxAge: 1 * 24 * 60 * 60 * 1000   // cookie expiry: set to match refresh token time
    })


    res.status(200).json({
      accessToken
    })

  } catch (err) {
    console.log(err)
  }
}

export async function refresh(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({
      mesage: "Unauthorized"
    })
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({
        message: 'Forbidden',
      })

      const valid = await authModel.findOne({ email: decoded.username });
      if (!valid) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }

      const accessToken = jwt.sign(
        {
          'UserInfo': {
            'username': valid.email,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' },
      )
      res.json({ accessToken });
    }
  )
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export async function tryLogout(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204);

  res.clearCookie('jwt', { httpOnly: true, secure: true })
  res.json({ message: 'Cookie cleared' })
}

