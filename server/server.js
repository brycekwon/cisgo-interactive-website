import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import compression from 'compression';
import cors from 'cors';

import 'dotenv/config.js';

import authRouter from './routes/auth.js';
import experiencesRouter from './routes/experiences.js';

const app = express();

app.use(cors());
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/experiences', experiencesRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: "This path is not defined"
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(`${err.name}: ${err.message}\t${req.method}\t${req.url}`);
  console.error(`${err.stack}`);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({
    message: err.message,
    isError: true,
  });
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
