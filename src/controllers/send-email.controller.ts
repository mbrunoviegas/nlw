import { Router, Request, Response } from 'express';
import { Connection } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';
import { Survey } from '../entities/survey.entity';
import { User } from '../entities/user.entity';
import { SendEmailService } from '../services/send-email.service';
import { SurveyService } from '../services/survey.service';
import { UserService } from '../services/user.service';

export class SendEmailController {
  public routes = Router();
  private userService: UserService;
  private surveyService: SurveyService;
  private sendEmailService: SendEmailService;

  constructor(connection: Connection) {
    this.routes.post('/', this.execute);
    this.userService = new UserService(connection);
    this.surveyService = new SurveyService(connection);
    this.sendEmailService = new SendEmailService(connection);
  }

  private async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body();
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) {
      return response
        .status(400)
        .json({ statusCode: 400, message: 'Invalid email!' });
    }

    const survey: Survey = await this.surveyService.findSurveyByID(survey_id);
    if (!user) {
      return response
        .status(400)
        .json({ statusCode: 400, message: 'Invalid survey!' });
    }

    const surveyUser: SurveyUser = await this.sendEmailService.saveNewSurveyUser(
      user.id,
      survey_id
    );

    return response.status(201).json(survey);
  }
}
