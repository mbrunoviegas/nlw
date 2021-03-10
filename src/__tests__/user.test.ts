import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../app';
import createConnection from '../database';

describe('Users', () => {
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

  it('Should be able to create a new user', async () => {
    const response = await testRequest.post('/user').send({
      email: 'user@example.com',
      name: 'User Example',
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a user with exists email', async () => {
    const response = await testRequest.post('/user').send({
      email: 'user@example.com',
      name: 'User Example',
    });

    expect(response.status).toBe(400);
  });
});
