import { SurveyService } from '../services/survey.service';
import { Router, Request, Response } from 'express';
import { Survey } from '../entities/survey.entity';
import { Connection } from 'typeorm';

export class SurveyController {
  public routes = Router();
  private surveyService: SurveyService;
  constructor(connection: Connection) {
    this.routes.post('/', this.create);
    this.routes.get('/', this.show);
    this.surveyService = new SurveyService(connection);
  }

  private create = async (request: Request, response: Response) => {
    const { title, description } = request.body;
    const survey: Survey = await this.surveyService.createSurvey(
      title,
      description
    );
    return response.status(201).json(survey);
  };

  private show = async (request: Request, response: Response) => {
    const surveys: Survey[] = await this.surveyService.getAllSurveys();
    if (surveys.length > 0) {
      return response.status(200).json(surveys);
    } else {
      return response
        .status(404)
        .json({ statusCode: 404, message: 'Não existem surveys.' });
    }
  };
}
