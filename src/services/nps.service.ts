import { Connection } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';
import { SurveyUserRepository } from '../repositories/survey-user.repository';

export class NpsService {
  private surveyUserRepository: SurveyUserRepository;
  constructor(connection: Connection) {
    this.surveyUserRepository = connection.getCustomRepository(
      SurveyUserRepository
    );
  }

  async execute(survey_id: string): Promise<object> {
    const surveyUsers: SurveyUser[] = await this.surveyUserRepository.findAllBySurveyId(
      survey_id
    );

    const detractors = surveyUsers.filter((surveyUser) => {
      return surveyUser.value >= 0 && surveyUser.value <= 6;
    }).length;

    console.log(detractors);

    const promoters = surveyUsers.filter((surveyUser) => {
      return surveyUser.value >= 9 && surveyUser.value <= 10;
    }).length;

    const passive = surveyUsers.filter((surveyUser) => {
      return surveyUser.value >= 7 && surveyUser.value <= 8;
    }).length;

    const totalAnswers = surveyUsers.length;

    const nps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return {
      detractors,
      promoters,
      passive,
      totalAnswers,
      nps,
    };
  }
}
