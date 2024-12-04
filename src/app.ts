/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import config from 'config';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import express, { NextFunction, Request, Response } from 'express';
import router from './routes';
import AppError from './utils/AppError';
import log from './utils/logger';
import globalErrorHandler from './controller/error.controller';
import { CustomRequest } from './types';

const app = express();

// NOTE: Global Middleware

// Security HTTP Headers
app.use(helmet());
// Rate Limiter for requests from the same ip
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour! ',
});
app.use('/api', limiter);

// Body parser , reading data from body int req.body
app.use(express.json({ limit: '10kb' }));

// TODO: Data sanitization against SQL XSS
// app.use(xss());

// Prevent parameter pollution

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test Middleware
app.use((req: CustomRequest, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
// start routes
app.use(router);
// NOTE: this route will catch all undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find on this server! ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
//
// Server configurations
const port = config.get('port');

const server = app.listen(port, async () => {
  log.info(`Listening on port http://localhost:${port}`);
  // connectToDb();
});

////////////////////////////////////////////////////////////////////////////
/* handle Unhandled Rejection  */
process.on('unhandledRejection', (err: any) => {
  log.error(err);
  log.error('Unhandled Rejection 💥 shutting down.....');

  server.close(() => {
    process.exit(1);
  });
});
/* handle Uncaught Exception  */
process.on('uncaughtException', (err: any) => {
  log.error(err);
  log.error('Uncaught Exception 💥 shutting down.....');
  process.exit(1);
});

export default app;
