import { Connection } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';
import { SurveyUserRepository } from '../repositories/survey-user.repository';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserRepository } from '../repositories/user.repository';

export class SendEmailService {
  private surveyRepository: SurveyRepository;
  private surveyUserRepository: SurveyUserRepository;
  private userRepository: UserRepository;

  constructor(connection: Connection) {
    this.surveyRepository = connection.getCustomRepository(SurveyRepository);
    this.surveyUserRepository = connection.getCustomRepository(
      SurveyUserRepository
    );
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  public async saveNewSurveyUser(
    user_id: string,
    survey_id: string
  ): Promise<SurveyUser> {
    const surveyUser: SurveyUser = await this.surveyUserRepository.createAndSaveNewSurvey(
      user_id,
      survey_id
    );
    return surveyUser;
  }
}
