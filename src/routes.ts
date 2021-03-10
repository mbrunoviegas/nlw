import { Router } from 'express';
import * as Constrollers from './controllers';

export class Routes {
  private routes = Router();

  constructor() {
    this.routes = Router();
    this.createRoutes();
  }

  private createRoutes() {
    Object.values(Constrollers).forEach((controller) => {
      const routeName =
        '/' + controller.name.toLocaleLowerCase().replace('controller', '');
      this.routes.use(routeName, new controller().routes);
    });
  }

  get getRoutes(): Router {
    return this.routes;
  }
}
