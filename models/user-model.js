const mongoose = require("mongoose");
const transactionSchema = require("./transaction-schema");
// Import the Transaction model

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0; // Custom validation function to ensure balance is non-negative
      },
      message: "Balance cannot be negative",
    },
  },
  transactionHistory: [transactionSchema], // Embed Transaction schema as an array
  password: { type: String, required: true },
  phoneNumber: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
