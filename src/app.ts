import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { Routes } from './routes';
import createConnection from './database';
import { AppError } from './errors/app.error';

class App {
  private express: Express;

  constructor() {
    this.express = express();
    this.createRoutes();
  }

  private async createRoutes() {
    const routes = new Routes(await createConnection()).getRoutes;
    this.express.use(express.json());
    this.express.use(routes);
    this.express.use(
      (
        err: Error,
        request: Request,
        response: Response,
        _next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'Error',
          message: 'Internal server error',
        });
      }
    );
  }

  public getApp(): Express {
    return this.express;
  }
}

export default new App().getApp();
