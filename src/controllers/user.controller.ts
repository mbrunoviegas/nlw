import { Request, Response, Router } from 'express';
import { AppError } from '../errors/app.error';
import { SchemaValidate } from '../schemas/schema.validate';
import { UserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

export class UserController {
  public routes: Router = Router();
  private userService: UserService;
  private schemaValidate: SchemaValidate;

  constructor() {
    this.routes.post('/', this.create);
    this.userService = new UserService();
    this.schemaValidate = new SchemaValidate(UserSchema);
  }

  private create = async (request: Request, response: Response) => {
    await this.schemaValidate.validateSchema(request.body);
    const { name, email } = request.body;
    const result = await this.userService.createUser(name, email);
    if (typeof result === 'boolean') {
      throw new AppError('Cliente already exists');
    } else {
      response.status(201).json(result);
    }
  };
}
