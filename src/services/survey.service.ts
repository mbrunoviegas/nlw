import { Connection, getCustomRepository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { SurveyRepository } from '../repositories/survey.repository';

export class SurveyService {
  private surveyRepository: SurveyRepository;

  constructor(connection: Connection) {
    this.surveyRepository = connection.getCustomRepository(SurveyRepository);
  }

  public async createSurvey(
    title: string,
    description: string
  ): Promise<Survey> {
    try {
      const newSurvey: Survey = await this.surveyRepository.createAndSaveNewSurvey(
        title,
        description
      );
      return newSurvey;
    } catch (error) {
      console.log(__filename + error);
    }
  }

  public async getAllSurveys() {
    return await this.surveyRepository.findAllSurveys();
  }

  public async findSurveyByID(id: string): Promise<Survey> {
    return await this.surveyRepository.findByID(id);
  }
}
