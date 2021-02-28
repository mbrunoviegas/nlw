import { Request, Response, Router } from 'express';
import { Connection } from 'typeorm';
import { NpsService } from '../services/nps.service';

export class NpsController {
  public routes = Router();
  private npsService: NpsService;

  constructor(connection: Connection) {
    this.routes.get('/:survey_id', this.execute);
    this.npsService = new NpsService(connection);
  }

  private execute = async (request: Request, response: Response) => {
    const { survey_id } = request.params;
    const npsResponse = await this.npsService.execute(survey_id);
    return response.status(200).json(npsResponse);
  };
}
