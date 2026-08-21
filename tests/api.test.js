import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

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
