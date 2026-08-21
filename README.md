Coffee Blockchain API

A Node.js backend API for tracking Fair Trade coffee shipments using a blockchain-based logistics ledger protected by Proof of Work.

The application allows coffee farms, roasteries and cafés to register coffee movements as transactions. Pending transactions can then be mined into blocks and added to the blockchain.

Technologies

- Node.js
- Express
- Vitest
- Supertest
- Node.js crypto
- SHA-256
- Proof of Work

Installation

Clone the repository and install the dependencies:

git clone https://github.com/bobtri/coffee-blockchain.git
cd coffee-blockchain
npm install

Start the server

Run:

npm start

The server starts on:

http://localhost:3000

If a PORT environment variable is provided, that port will be used instead.

Run tests

Run the test suite with:

npm test

To run all tests once:

npm run test:run

Code coverage

Run:

npm run coverage

The project has more than 80% code coverage, which satisfies the coverage requirement for VG.

Blockchain

The blockchain consists of:

- chain – an array containing completed blocks.
- pendingTransactions – transactions waiting to be mined.
- difficulty – determines how many zeroes a valid Proof-of-Work hash must begin with.

Each block contains:

{
"index": 1,
"timestamp": 123456789,
"transactions": [],
"previousHash": "0",
"nonce": 25,
"hash": "00abc..."
}

Transactions

A transaction represents a coffee shipment.

Example:

{
"sender": "Coffee Farm",
"recipient": "Roastery",
"batchId": "BATCH-001",
"weightKg": 250
}

All four fields are required.

sender, recipient and batchId must be strings.

weightKg must be a positive number.

Proof of Work

The application uses Node.js’ built-in crypto module and SHA-256 hashing.

The hash is generated from:

index + previousHash + transactions + nonce

During mining, the nonce is increased until the generated hash begins with the required number of zeroes.

For example, with difficulty 2, a valid hash must begin with:

00

Mining difficulty

The mining difficulty changes depending on the environment.

During tests:

NODE_ENV=test
difficulty = 1

Outside the test environment:

difficulty = 2

This allows the Proof-of-Work algorithm to be tested quickly without causing test timeouts.

API

GET /blockchain

Returns the current blockchain and all pending transactions.

Example response:

{
"chain": [],
"pendingTransactions": []
}

POST /transactions

Adds a new coffee shipment to pendingTransactions.

Example request:

{
"sender": "Coffee Farm",
"recipient": "Roastery",
"batchId": "BATCH-001",
"weightKg": 250
}

Successful response:

{
"message": "Transaction added",
"transaction": {
"sender": "Coffee Farm",
"recipient": "Roastery",
"batchId": "BATCH-001",
"weightKg": 250
}
}

Invalid transactions return HTTP status 400.

POST /mine

Mines all pending transactions into a new block using Proof of Work.

Successful mining returns HTTP status 201 together with the newly created block.

If there are no pending transactions, the endpoint returns HTTP status 400.

Test-Driven Development

The application was developed using Test-Driven Development.

Tests were written before the corresponding production code. The Git history therefore shows a RED → GREEN progression.

Example 1 – SHA-256 hashing

RED – failing test:

619ab4f test: add failing test for SHA-256 hash

GREEN – implementation:

b2310d6 feat: implement SHA-256 hash function

Links:

https://github.com/bobtri/coffee-blockchain/commit/619ab4f
https://github.com/bobtri/coffee-blockchain/commit/b2310d6

Example 2 – Proof-of-Work mining

RED – failing test:

a567e4c test: add failing test for proof-of-work mining

GREEN – implementation:

769c8fa feat: implement proof-of-work mining

Links:

https://github.com/bobtri/coffee-blockchain/commit/a567e4c
https://github.com/bobtri/coffee-blockchain/commit/769c8fa

Example 3 – Mining pending transactions

RED – failing test:

6ce6ccd test: add failing test for mining pending transactions

GREEN – implementation:

53de6c8 feat: mine pending transactions into new block

Links:

https://github.com/bobtri/coffee-blockchain/commit/6ce6ccd
https://github.com/bobtri/coffee-blockchain/commit/53de6c8

Testing

The project contains both unit tests and integration tests.

Unit tests cover functionality such as:

- SHA-256 hashing
- Proof-of-Work
- blockchain structure
- pending transactions
- mining

Integration tests use Supertest to verify:

- GET /blockchain
- POST /transactions
- transaction validation
- POST /mine

Project structure

coffee-blockchain/
├── src/
│ ├── blockchain/
│ │ └── Blockchain.js
│ ├── middleware/
│ │ └── validateTransaction.js
│ ├── app.js
│ └── server.js
├── tests/
│ ├── Blockchain.test.js
│ └── api.test.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
