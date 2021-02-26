import { Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';
export class UserController {
  public routes: Router = Router();
  private userSerivce: UserService;

  constructor() {
    this.routes.post('/', this.create);
    this.userSerivce = new UserService();
  }

  private async create(request: Request, response: Response) {}
}
