function validateTransaction(req, res, next) {
  const { sender, recipient, batchId, weightKg } = req.body;

  if (!sender || !recipient || !batchId || weightKg === undefined) {
    return res.status(400).json({
      error: 'sender, recipient, batchId and weightKg are required',
    });
  }

  if (
    typeof sender !== 'string' ||
    typeof recipient !== 'string' ||
    typeof batchId !== 'string'
  ) {
    return res.status(400).json({
      error: 'sender, recipient and batchId must be strings',
    });
  }

  if (typeof weightKg !== 'number' || weightKg <= 0) {
    return res.status(400).json({
      error: 'weightKg must be a positive number',
    });
  }

  next();
}

export default validateTransaction;
