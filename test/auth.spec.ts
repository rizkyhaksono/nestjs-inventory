import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
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
    });

    it('should be rejected if the request body is incomplete', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: '',
          password: '',
        });

      expect(response.status).toBe(500);
    });

    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email: 'test@gmail.com',
          username: 'test user',
          password: 'test12345',
        });

      expect(response.status).toBe(201);
      expect(response.body.username).toBe('test user');
      expect(response.body.email).toBe('test@gmail.com');
    });

    it('should be rejected if the username is already taken', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'test user',
          email: 'test@gmail.com',
          password: 'test123',
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Users already taken');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if the request body is incomplete', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: '',
          password: '',
        });

      expect(response.status).toBe(404);
    });

    it('should be rejected if the user does not exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'testwrong@gmail.com',
          password: 'test123',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        'No user found for email: testwrong@gmail.com',
      );
    });

    it('should be rejected if the password is incorrect', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'wrong',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid password');
    });

    it('should login an user', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'test123',
        });

      expect(response.status).toBe(201);
    });
  });
});
