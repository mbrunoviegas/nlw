import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
export class UserController {
  public routes: Router = Router();
  private userService: UserService;

  constructor() {
    this.routes.post('/', this.create);
    this.userService = new UserService();
  }

  private async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)
  }
}
