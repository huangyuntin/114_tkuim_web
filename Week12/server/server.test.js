import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from './server.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Server API Tests', () => {
  
  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/api/random-route-xyz');
    expect(res.statusCode).toBe(404);
  });

  it('should attempt to access signup route', async () => {
    const res = await request(app).post('/api/signup').send({});
    expect(res.statusCode).not.toBe(404);
  });

});