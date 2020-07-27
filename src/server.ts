import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routers from './routers';

import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routers);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('\n\n\nListening');
});
