import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../app';
import createConnection from '../database';

describe('Users', () => {
  var connection: Connection;
  var testRequest: request.SuperTest<request.Test>;
  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    testRequest = request(app);
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('request should be defined', () => {
    expect(testRequest).toBeDefined();
  });

  it('Should be able to create a new User', async () => {
    const response = await testRequest
      .post('/user')
      .send({ name: 'User Example', email: 'user@example.com' });
    expect(response.status).toBe(201);
  });
});
