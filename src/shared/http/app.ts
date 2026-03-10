import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { initializeDatabase } from '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  await initializeDatabase();

  return next();
});

app.use(routes);

app.use(errors());

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default app;
