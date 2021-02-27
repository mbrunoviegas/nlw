import { Request, Response, Router } from 'express';
import { Connection } from 'typeorm';
import { convertToObject } from 'typescript';
import { UserService } from '../services/user.service';
export class UserController {
  public routes: Router = Router();
  private userService: UserService;

  constructor(connection: Connection) {
    this.routes.post('/', this.create);
    this.userService = new UserService(connection);
  }

  private create = async (request: Request, response: Response) => {
    const { name, email } = request.body;
    const result = await this.userService.createUser(name, email);
    try {
      if (typeof result === 'boolean') {
        response
          .status(400)
          .json({ statusCode: 400, message: 'Cliente existe.' });
      } else {
        response.status(201).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
