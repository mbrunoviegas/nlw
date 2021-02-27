import { AbstractRepository, EntityRepository } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';

@EntityRepository()
export class SurveyUserRepository extends AbstractRepository<SurveyUser> {
  public async createAndSaveNewSurvey(
    user_id: string,
    survey_id: string
  ): Promise<SurveyUser> {
    const surveyUser = this.manager.create(SurveyUser, { user_id, survey_id });
    await this.manager.save(surveyUser);
    return surveyUser;
  }
}
