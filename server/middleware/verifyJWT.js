import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Forbidden',
        });
      }

      req.user = decoded.username;
      next();
    });

  } catch(err) {
    console.log(err)
  }
}
