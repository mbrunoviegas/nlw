import { Request, Response, Router } from 'express';
import { NpsService } from '../services/nps.service';

export class NpsController {
  public routes = Router();
  private npsService: NpsService;

  constructor() {
    this.routes.get('/:survey_id', this.execute);
    this.npsService = new NpsService();
  }

  private execute = async (request: Request, response: Response) => {
    const { survey_id } = request.params;
    const npsResponse = await this.npsService.execute(survey_id);
    return response.status(200).json(npsResponse);
  };
}
