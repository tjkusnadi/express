import type { Application } from 'express';
import type { Pool } from 'pg';

import request from 'supertest';
import { createApp } from '../../../src/app';

let app: Application;
let pool: Pool;

beforeAll(async () => {
  const setup = await createApp();
  app = setup.app;
  pool = setup.pool;

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS request_logs (
      id SERIAL PRIMARY KEY,
      method VARCHAR(10) NOT NULL,
      path VARCHAR(255) NOT NULL,
      status INTEGER NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      response_time INT,
      ip VARCHAR(45),
      user_agent TEXT
  )`;

  await pool.query(createTableQuery);
});

beforeEach(async () => {
  await pool.query('DELETE FROM request_logs');
});

afterAll(async () => {
  await pool.query('DROP TABLE IF EXISTS request_logs');
  await pool.end();
});

describe('GET /healthcheck', () => {
  it('returns 200 OK and logs the request', async () => {
    const res = await request(app)
      .get('/healthcheck');

    const result = await pool.query(
      `SELECT * FROM request_logs WHERE path = '/healthcheck' AND method = 'GET'`
    );

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(result.rows.length).toBe(1);
  });
});
