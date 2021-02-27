import { EntityRepository, AbstractRepository } from 'typeorm';
import { Survey } from '../entities/survey.entity';

@EntityRepository(Survey)
export class SurveyRepository extends AbstractRepository<Survey> {
  public async createAndSaveNewSurvey(
    title: string,
    description: string
  ): Promise<Survey> {
    const survey = this.manager.create(Survey, { title, description });
    await this.manager.save(survey);
    return survey;
  }

  public async findAllSurveys(): Promise<Survey[]> {
    return await this.manager.find(Survey);
  }

  public async findByID(id: string): Promise<Survey> {
    return await this.manager.findOne(Survey, { id });
  }
}
