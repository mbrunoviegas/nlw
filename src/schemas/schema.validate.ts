import { ObjectSchema } from 'yup';
import { AppError } from '../errors/app.error';

export class SchemaValidate {
  private schema: ObjectSchema<any>;
  constructor(schema: ObjectSchema<any>) {
    this.schema = schema;
  }

  async validateSchema(body: any) {
    try {
      await this.schema.validate(body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }
  }
}
