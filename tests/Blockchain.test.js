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

describe('Blockchain mining', () => {
  it('should find a hash that matches the difficulty', () => {
    const blockchain = new Blockchain();

    const result = blockchain.mineBlock(1, 'previousHash', [
      { sender: 'Farm', recipient: 'Roastery', batchId: 'A1', weightKg: 100 },
    ]);

    expect(result.hash.startsWith('0')).toBe(true);
    expect(result.nonce).toBeGreaterThanOrEqual(0);
  });
});
