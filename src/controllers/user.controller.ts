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

  create = async (request: Request, response: Response) => {
    const { name, email } = request.body;
    const result = await this.userService.createUser(name, email);
    if (typeof result === 'boolean') {
      response
        .status(400)
        .send({ statusCode: 400, message: 'Cliente existe.' });
    } else {
      response.status(200).send({ statusCode: 200, message: 'Usuário criado.' });
    }
  };
}
