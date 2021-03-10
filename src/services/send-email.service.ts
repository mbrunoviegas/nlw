import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { getConnection } from 'typeorm';
import { SurveyUser } from '../entities/survey-user.entity';
import { SurveyUserRepository } from '../repositories/survey-user.repository';
export class SendEmailService {
  private surveyUserRepository: SurveyUserRepository;
  private client: Transporter;

  constructor() {
    this.surveyUserRepository = getConnection().getCustomRepository(
      SurveyUserRepository
    );
    this.createClientTransporter();
  }

  public async findUnanswered(user_id: string): Promise<SurveyUser> {
    return await this.surveyUserRepository.findUnansweredSurveys(user_id);
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

  private createClientTransporter() {
    nodemailer.createTestAccount().then((account) => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async execute(
    to: string,
    subject: string,
    variables: object,
    path: string
  ) {
    const templateFileContent = fs.readFileSync(path).toString('utf8');
    const emailTemplateBars = handlebars.compile(templateFileContent);
    const html = emailTemplateBars(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
