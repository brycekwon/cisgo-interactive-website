import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 login requests per window per minute
  message: {
    message: 'Too many login requests from this IP, please try again in 60 seconds.'
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.mesage)
  },
  standardHeaders: true,  // return rate limit info in the RateLimit-* headers
  legacyHeaders: false,   // disable X-RateLimit-* headers
})

export default loginLimiter;
