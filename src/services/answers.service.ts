import { getConnection } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';
import { SurveyUserRepository } from '../repositories/survey-user.repository';

export class AnswersService {
  private surveyUserRepository: SurveyUserRepository;

  constructor() {
    this.surveyUserRepository = getConnection().getCustomRepository(
      SurveyUserRepository
    );
  }

  public async findSurveyUserById(id: string): Promise<SurveyUser> {
    return await this.surveyUserRepository.findById(id);
  }

  public async updateAndSaveSurveyUser(surveyUser: SurveyUser, value: number) {
    surveyUser.value = value;
    await this.surveyUserRepository.save(surveyUser);
  }
}
