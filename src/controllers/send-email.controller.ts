import { Router, Request, Response } from 'express';
import { Connection } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';
import { Survey } from '../entities/survey.entity';
import { User } from '../entities/user.entity';
import { SendEmailService } from '../services/send-email.service';
import { SurveyService } from '../services/survey.service';
import { UserService } from '../services/user.service';
import { resolve } from 'path';
import { AppError } from '../errors/app.error';

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

  private execute = async (request: Request, response: Response) => {
    const { email, survey_id } = request.body;
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new AppError('Invalid email');
    }

    const survey: Survey = await this.surveyService.findSurveyByID(survey_id);
    if (!survey) {
      throw new AppError('Invalid Survey');
    }

    const unansweredSurvey = await this.sendEmailService.findUnanswered(
      user.id
    );
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    };

    if (unansweredSurvey) {
      variables.id = unansweredSurvey.id;
      await this.sendEmailService.execute(
        email,
        survey.title,
        variables,
        npsPath
      );
      return response.json(unansweredSurvey);
    }

    const surveyUser: SurveyUser = await this.sendEmailService.saveNewSurveyUser(
      user.id,
      survey_id
    );
    variables.id = surveyUser.id;
    await this.sendEmailService.execute(
      email,
      survey.title,
      variables,
      npsPath
    );
    return response.status(201).json(surveyUser);
  };
}
