import jwt from 'jsonwebtoken';


export function createAccessToken(user, exp) {
  return jwt.sign(
    { 'username': user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: exp },
  );
}

export function createRefreshToken(user, exp) {
  return jwt.sign(
    { 'username': user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: exp },
  );
}
