import express from 'express';
import Blockchain from './blockchain/Blockchain.js';

const app = express();

app.use(express.json());

const blockchain = new Blockchain();

app.get('/blockchain', (req, res) => {
  res.status(200).json({
    chain: blockchain.chain,
    pendingTransactions: blockchain.pendingTransactions,
  });
});

export default app;
