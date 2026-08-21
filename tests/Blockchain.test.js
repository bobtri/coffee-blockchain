import { describe, it, expect } from 'vitest';
import Blockchain from '../src/blockchain/Blockchain.js';

describe('Blockchain hash function', () => {
  it('should generate a SHA-256 hash', () => {
    const blockchain = new Blockchain();

    const hash = blockchain.calculateHash(
      1,
      'previousHash',
      [{ sender: 'Farm', recipient: 'Roastery', batchId: 'A1', weightKg: 100 }],
      0,
    );

    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
