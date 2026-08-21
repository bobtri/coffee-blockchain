import express from 'express';
import Blockchain from './blockchain/Blockchain.js';
import validateTransaction from './middleware/validateTransaction.js';

function createApp() {
  const app = express();
  const blockchain = new Blockchain();

  app.use(express.json());

  app.get('/blockchain', (req, res) => {
    res.status(200).json({
      chain: blockchain.chain,
      pendingTransactions: blockchain.pendingTransactions,
    });
  });

  app.post('/transactions', validateTransaction, (req, res) => {
    const transaction = req.body;

    blockchain.addTransaction(transaction);

    res.status(201).json({
      message: 'Transaction added',
      transaction,
    });
  });

  app.post('/mine', (req, res) => {
    const block = blockchain.minePendingTransactions();

    if (!block) {
      return res.status(400).json({
        error: 'No pending transactions to mine',
      });
    }

    res.status(201).json({
      message: 'Block mined successfully',
      block,
    });
  });

  return app;
}

export default createApp;
