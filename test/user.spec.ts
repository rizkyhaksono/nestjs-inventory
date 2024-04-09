/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('User Controller Test', () => {
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

  describe('GET /api/user', () => {
    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user')
        .set('Authorization', `Bearer wrong`)
      
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
      })

    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user')
        .set('Authorization', `Bearer ${process.env.accessTokenTest}`);

      expect(response.status).toBe(200);
    });
  })

  describe('GET /api/user/{uuid}', () => {
    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/user/${process.env.uuidTest}`)
        .set('Authorization', `Bearer wrong`);
      
      expect(response.status).toBe(401);
    })

    it('should be able to get user by uuid', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/user/${process.env.uuidTest}`)
        .set('Authorization', `Bearer ${process.env.accessTokenTest}`);

      expect(response.status).toBe(200);
    })
  })

  describe('PATCH /api/user/{uuid}', () => {
    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/user/${process.env.uuidTest}`)
        .set('Authorization', `Bearer wrong`)

      expect(response.status).toBe(401)
    })

    it('should be able to update user by uuid', async () => {
      const randomString = Math.random().toString(36).substring(7);

      const response = await request(app.getHttpServer())
        .patch(`/api/user/${process.env.uuidTest}`)
        .set('Authorization', `Bearer ${process.env.accessTokenTest}`)
        .send({
          email: `${randomString}@gmail.com`,
          username: `${randomString}-haksono`,
          password: 'test123'
        })

      expect(response.status).toBe(200);
    })
  })

  describe('DELETE /api/user/{uuid}', () => {
    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/user/invalid-uuid`)
        .set('Authorization', `Bearer wrong`)

      expect(response.status).toBe(401)
    })

    // CREATE A NEW USER TO RUN THIS TEST
    it('should be able to delete user by uuid', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/user/66d3bfc9-88ef-4a99-bc00-168fe7f15916')
        .set('Authorization', `Bearer ${process.env.accessTokenTest}`)
      
      expect(response.status).toBe(200);
    })
  })
});
