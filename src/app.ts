import 'reflect-metadata';
import express, { Express } from 'express';
import { Routes } from './routes';
import createConnection from './database';

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
  }

  public getApp(): Express {
    return this.express;
  }
}

export default new App().getApp();
