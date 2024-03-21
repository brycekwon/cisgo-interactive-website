import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config.js';

import authRouter from './routes/authRoutes.js';
import experiencesRouter from './routes/experiencesRoutes.js';

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/experiences', experiencesRouter);

// catch favicon.ico
app.use((req, res) => {
  if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

async function main() {
  // connect to experiences database
  await mongoose
    .connect(process.env.DATA_DB)
    .then(() => console.log('Connected to data database'))
    .catch((err) => console.log(err));

  // startup server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}
main();
