const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Deposit', 'Withdrawal', 'Send' , 'Receive'],
    required: true
  },
  balance:{
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  accountNumber: {
    type: String,
  },
});

module.exports = transactionSchema;
