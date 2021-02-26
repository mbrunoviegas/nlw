import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/survey.repository';

export class SurveyService {
  private surveyRepository: SurveyRepository;

  constructor() {
    this.surveyRepository = getCustomRepository(SurveyRepository);
  }
}
