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

describe('Blockchain structure', () => {
  it('should start with a genesis block and an empty pending transaction list', () => {
    const blockchain = new Blockchain();

    expect(blockchain.chain).toHaveLength(1);
    expect(blockchain.chain[0].index).toBe(0);
    expect(blockchain.chain[0].previousHash).toBe('0');
    expect(blockchain.pendingTransactions).toEqual([]);
  });
});

describe('Blockchain transactions', () => {
  it('should add a transaction to pendingTransactions', () => {
    const blockchain = new Blockchain();

    const transaction = {
      sender: 'Coffee Farm',
      recipient: 'Roastery',
      batchId: 'BATCH-001',
      weightKg: 250,
    };

    blockchain.addTransaction(transaction);

    expect(blockchain.pendingTransactions).toHaveLength(1);
    expect(blockchain.pendingTransactions[0]).toEqual(transaction);
  });
});

describe('Latest block', () => {
  it('should return the genesis block', () => {
    const blockchain = new Blockchain();

    const latestBlock = blockchain.getLatestBlock();

    expect(latestBlock.index).toBe(0);
    expect(latestBlock.previousHash).toBe('0');
  });
});

describe('Mining pending transactions', () => {
  it('should mine pending transactions into a new block', () => {
    const blockchain = new Blockchain();

    const transaction = {
      sender: 'Coffee Farm',
      recipient: 'Roastery',
      batchId: 'BATCH-001',
      weightKg: 250,
    };

    blockchain.addTransaction(transaction);

    const newBlock = blockchain.minePendingTransactions();

    expect(blockchain.chain).toHaveLength(2);
    expect(newBlock.index).toBe(1);
    expect(newBlock.previousHash).toBe('0');
    expect(newBlock.transactions).toEqual([transaction]);
    expect(newBlock.hash.startsWith('0')).toBe(true);
    expect(blockchain.pendingTransactions).toEqual([]);
  });
});

describe('Mining without pending transactions', () => {
  it('should not create a new block when there are no pending transactions', () => {
    const blockchain = new Blockchain();

    const result = blockchain.minePendingTransactions();

    expect(result).toBeNull();
    expect(blockchain.chain).toHaveLength(1);
  });
});
