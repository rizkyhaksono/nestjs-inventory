/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { AppModule } from 'src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('Auth Controller Test', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = module.createNestApplication();
    testService = module.get<TestService>(TestService);
    await app.init();
  });

  afterAll(async () => {
    await testService.deleteAll();
    await app.close();
  });

  describe('POST /api/auth/register', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    })

    it('should be rejected if the request body is incomplete', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: '',
          password: ''
        })

      expect(response.status).toBe(400);
    })

    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'test user',
          password: 'test12345'
        })

      expect(response.status).toBe(201);
      expect(response.body.data.username).toBe('test user')
      expect(response.body.data.email).toBe('test@gmail.com')
    })

    it('should be rejected if the username is already taken', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'test user',
          email: 'test@gmail.com',
          password: 'test123'
        })

      // TODO: Not yet implemented in the controller the 409 status code
      expect(response.status).toBe(500);
    })
  })
});
