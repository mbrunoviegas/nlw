import { Router } from 'express';
import * as Constrollers from './controllers';
const routes = Router();

Object.values(Constrollers).forEach((controller) => {
  const routeName =
    '/' + controller.name.toLocaleLowerCase().replace('controller', '');
  routes.use(routeName, new controller().routes);
});

export default routes;
