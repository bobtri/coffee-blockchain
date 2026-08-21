import express from 'express';
import Blockchain from './blockchain/Blockchain.js';
import validateTransaction from './middleware/validateTransaction.js';

const app = express();

app.use(express.json());

const blockchain = new Blockchain();

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

export default app;
