import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../app';
import createConnection from '../database';
import { Survey } from '../entities/survey.entity';

describe('Surveys', () => {
  var connection: Connection;
  var testRequest: request.SuperTest<request.Test>;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    testRequest = request(app);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('request should be defined', () => {
    expect(testRequest).toBeDefined();
  });

  it('Should be able to create a new Survey', async () => {
    const response = await testRequest.post('/survey').send({
      title: 'Survey Example',
      description: 'This is an example of survey',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should return an array of surveys', async () => {
    const response = await testRequest.get('/survey').send();
    expect(response.status).toBe(200);
    expect(response.body.length > 0).toBeTruthy();
  });
});
