function validateTransaction(req, res, next) {
  const { sender, recipient, batchId, weightKg } = req.body;

  if (!sender || !recipient || !batchId || weightKg === undefined) {
    return res.status(400).json({
      error: 'sender, recipient, batchId and weightKg are required',
    });
  }

  next();
}

export default validateTransaction;
