import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import createApp from '../src/app.js';

let app;

beforeEach(() => {
  app = createApp();
});

describe('GET /blockchain', () => {
  it('should return the blockchain', async () => {
    const response = await request(app).get('/blockchain');

    expect(response.status).toBe(200);
    expect(response.body.chain).toBeDefined();
    expect(response.body.pendingTransactions).toBeDefined();
  });
});

describe('POST /transactions', () => {
  it('should add a valid transaction', async () => {
    const transaction = {
      sender: 'Coffee Farm',
      recipient: 'Roastery',
      batchId: 'BATCH-001',
      weightKg: 250,
    };

    const response = await request(app).post('/transactions').send(transaction);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Transaction added');
    expect(response.body.transaction).toEqual(transaction);
  });

  it('should reject a transaction with missing fields', async () => {
    const invalidTransaction = {
      sender: 'Coffee Farm',
      recipient: 'Roastery',
      weightKg: 250,
    };

    const response = await request(app)
      .post('/transactions')
      .send(invalidTransaction);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe('POST /mine', () => {
  it('should mine pending transactions into a new block', async () => {
    const transaction = {
      sender: 'Coffee Farm',
      recipient: 'Roastery',
      batchId: 'BATCH-002',
      weightKg: 150,
    };

    await request(app).post('/transactions').send(transaction);

    const response = await request(app).post('/mine');

    expect(response.status).toBe(201);
    expect(response.body.block).toBeDefined();
    expect(response.body.block.transactions).toContainEqual(transaction);
    expect(response.body.block.hash.startsWith('0')).toBe(true);
  });

  it('should reject mining when there are no pending transactions', async () => {
    const response = await request(app).post('/mine');

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
