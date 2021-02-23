import { Request, Response, Router } from 'express';

export class UserController {
  public routes: Router = Router();

  constructor() {
    this.routes.post('/', this.create)
  }

  private async create(request: Request, response: Response) {}
}
