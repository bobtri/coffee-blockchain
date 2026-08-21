# ☕ Coffee Blockchain API

A Node.js REST API that simulates a blockchain-based logistics ledger for tracking Fair Trade coffee shipments.

This project was developed as part of the Backend Node.js course using **Express**, **Vitest**, **Supertest**, **Proof of Work**, **SHA-256 hashing**, and **Test-Driven Development (TDD)**.

---

# 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Running the application](#-running-the-application)
- [Running the tests](#-running-the-tests)
- [API Endpoints](#-api-endpoints)
- [Proof of Work](#-proof-of-work)
- [Environment Variables](#-environment-variables)
- [TDD Workflow](#-tdd-workflow)
- [Code Coverage](#-code-coverage)
- [Project Structure](#-project-structure)

---

# 🚀 Features

- Blockchain implementation
- Genesis block
- SHA-256 hashing
- Proof-of-Work mining
- Pending transactions
- REST API with Express
- Request validation middleware
- Unit tests
- Integration tests
- Test Driven Development

---

# 🛠 Technologies

- Node.js
- Express
- Vitest
- Supertest
- Node.js Crypto
- SHA-256
- REST API

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/bobtri/coffee-blockchain.git
cd coffee-blockchain
```

Install dependencies

```bash
npm install
```

---

# ▶ Running the application

```bash
npm start
```

The server starts on

```
http://localhost:3000
```

---

# 🧪 Running the tests

Run all tests

```bash
npm test
```

Run coverage

```bash
npm run coverage
```

Current coverage

| Metric     | Result |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 91.66% |
| Functions  | 100%   |
| Lines      | 100%   |

---

# 📡 API Endpoints

## GET /blockchain

Returns the current blockchain.

### Response

```json
{
  "chain": [],
  "pendingTransactions": []
}
```

---

## POST /transactions

Adds a new pending transaction.

### Request

```json
{
  "sender": "Coffee Farm",
  "recipient": "Roastery",
  "batchId": "BATCH-001",
  "weightKg": 250
}
```

---

## POST /mine

Mines all pending transactions into a new block.

---

# ⛏ Proof of Work

The blockchain uses SHA-256 hashing together with a nonce.

The hash is generated from

```
index + previousHash + transactions + nonce
```

The nonce increases until the generated hash starts with the required number of leading zeroes.

Example

```
0004af83...
```

---

# ⚙ Environment Variables

Mining difficulty automatically changes depending on the environment.

| Environment | Difficulty |
| ----------- | ---------- |
| test        | 1          |
| production  | 2          |

This prevents slow tests while keeping the production version computationally harder.

---

# 🔴🟢 TDD Workflow

The project was developed using Test Driven Development.

Three examples from the Git history:

### SHA-256 Hash

RED

https://github.com/bobtri/coffee-blockchain/commit/619ab4f

GREEN

https://github.com/bobtri/coffee-blockchain/commit/b2310d6

---

### Proof of Work

RED

https://github.com/bobtri/coffee-blockchain/commit/a567e4c

GREEN

https://github.com/bobtri/coffee-blockchain/commit/769c8fa

---

### Mining Pending Transactions

RED

https://github.com/bobtri/coffee-blockchain/commit/6ce6ccd

GREEN

https://github.com/bobtri/coffee-blockchain/commit/53de6c8

---

# 📈 Code Coverage

The project exceeds the VG requirement of 80% code coverage.

```
Statements: 100%
Branches: 91.66%
Functions: 100%
Lines: 100%
```

---

# 📁 Project Structure

```
coffee-blockchain
│
├── src
│   ├── blockchain
│   │   └── Blockchain.js
│   ├── middleware
│   │   └── validateTransaction.js
│   ├── app.js
│   └── server.js
│
├── tests
│   ├── Blockchain.test.js
│   └── api.test.js
│
├── package.json
├── README.md
└── .gitignore
```
