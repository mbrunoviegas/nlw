import { Not, IsNull, AbstractRepository, EntityRepository } from 'typeorm';
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

  public async findUnansweredSurveys(user_id: string): Promise<SurveyUser> {
    return await this.manager.findOne(SurveyUser, {
      where: { user_id, value: null },
      relations: ['user', 'survey'],
    });
  }

  public async findById(id: string): Promise<SurveyUser> {
    return await this.manager.findOne(SurveyUser, { id });
  }

  public async save(surveyUser: SurveyUser) {
    await this.manager.save(surveyUser);
  }

  public async findAllBySurveyId(survey_id: string): Promise<SurveyUser[]> {
    return await this.manager.find(SurveyUser, {
      survey_id,
      value: Not(IsNull()),
    });
  }
}
