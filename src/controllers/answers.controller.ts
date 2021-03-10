import { Request, Response, Router } from 'express';
import { AppError } from '../errors/app.error';
import { AnswersService } from '../services/answers.service';

export class AnswersController {
  public routes = Router();
  private answersService: AnswersService;

  constructor() {
    this.answersService = new AnswersService();
    this.routes.get('/:value', this.execute);
  }

  private execute = async (request: Request, response: Response) => {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUser = await this.answersService.findSurveyUserById(String(u));

    if (!surveyUser) {
      throw new AppError('SurveyUser does not exist');
    }

    this.answersService.updateAndSaveSurveyUser(surveyUser, Number(value));

    return response.status(200).json(surveyUser);
  };
}
