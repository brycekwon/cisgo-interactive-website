import jwt from 'jsonwebtoken';


export function createAccessToken(user) {
  return jwt.sign(
    { 'username': user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' },
  );
}

export function createRefreshToken(user) {
  return jwt.sign(
    { 'username': user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' },
  );
}
