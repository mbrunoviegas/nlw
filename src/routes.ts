import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.status(200).send({ message: 'Hello World' });
});

routes.use('/', [toString, toString]);
export default routes;
