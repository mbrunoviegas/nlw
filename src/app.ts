import 'reflect-metadata';
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import 'express-async-errors';
import { Routes } from './routes';
import { AppError } from './errors/app.error';
import createConnection from './database';

class App {
  private express: Express;
  private routes: Router;

  constructor() {
    this.express = express();
    this.setupApplication();
  }

  private async setupApplication() {
    this.express.use(express.json());
    this.setupMiddlewares();
    await createConnection();
    this.getRoutes();
  }

  private async setupMiddlewares() {
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

  private async getRoutes() {
    this.routes = new Routes().getRoutes;
    this.express.use(this.routes);
  }

  public getApp(): Express {
    return this.express;
  }
}

export default new App().getApp();
