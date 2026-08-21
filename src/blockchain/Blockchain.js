import crypto from 'crypto';

class Blockchain {
  constructor() {
    this.difficulty = process.env.NODE_ENV === 'test' ? 1 : 2;
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      nonce: 0,
      hash: '0',
    };
  }

  calculateHash(index, previousHash, transactions, nonce) {
    const data = index + previousHash + JSON.stringify(transactions) + nonce;

    return crypto.createHash('sha256').update(data).digest('hex');
  }

  mineBlock(index, previousHash, transactions) {
    let nonce = 0;

    let hash = this.calculateHash(index, previousHash, transactions, nonce);

    const target = '0'.repeat(this.difficulty);

    while (!hash.startsWith(target)) {
      nonce++;

      hash = this.calculateHash(index, previousHash, transactions, nonce);
    }

    return {
      nonce,
      hash,
    };
  }
}

export default Blockchain;
