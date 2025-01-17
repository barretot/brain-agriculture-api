import { eq } from 'drizzle-orm';
import request from 'supertest';
import 'dotenv/config';

import { UserE2EBuilder } from './builders/user-e2e-builder';
import { users } from '../../src/infra/database/drizzle/schemas';

describe('Create account (E2E)', () => {
  test('[POST] /users', async () => {
    const { app, drizzle } = (await new UserE2EBuilder().success()).build();

    const response = await request(app.getHttpServer())
      .post('/user')
      .set('x-api-key', String(process.env.API_KEY))
      .send({
        name: 'Fake User',
        email: 'fake_user@test.com',
        cpfCnpj: '78796707003',
        password: 'passwordTest123',
      });

    console.log(response);

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await drizzle.db
      .select()
      .from(users)
      .where(eq(users.cpfCnpj, '78796707003'));

    expect(userOnDatabase).toBeTruthy();
  });
});
