import { SurveyService } from '../services/survey.service';

export class SurveyControlle {
  private surveyService: SurveyService;
  constructor() {
    this.surveyService = new SurveyService();
  }
}
