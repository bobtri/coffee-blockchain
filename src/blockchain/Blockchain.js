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

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions() {
    const latestBlock = this.getLatestBlock();
    const index = latestBlock.index + 1;
    const previousHash = latestBlock.hash;

    const miningResult = this.mineBlock(
      index,
      previousHash,
      this.pendingTransactions,
    );

    const newBlock = {
      index,
      timestamp: Date.now(),
      transactions: [...this.pendingTransactions],
      previousHash,
      nonce: miningResult.nonce,
      hash: miningResult.hash,
    };

    this.chain.push(newBlock);
    this.pendingTransactions = [];

    return newBlock;
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
