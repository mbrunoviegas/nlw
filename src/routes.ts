import { Router } from 'express';
import { Connection } from 'typeorm';
import * as Constrollers from './controllers';

export class Routes {
  private routes = Router();

  constructor(connection: Connection) {
    this.routes = Router();
    this.createRoutes(connection);
  }

  private createRoutes(connection: Connection) {
    Object.values(Constrollers).forEach((controller) => {
      const routeName =
        '/' + controller.name.toLocaleLowerCase().replace('controller', '');
      this.routes.use(routeName, new controller(connection).routes);
    });
  }

  get getRoutes(): Router {
    return this.routes;
  }
}
