const { model } = require("mongoose");
const transactionSchema = require("../models/transaction-schema");

const Transaction = model('Transaction', transactionSchema);

function createDepositTransaction(transactionDetails) {
    const transactionObj = new Transaction({
        type: 'Deposit', // Set the type of transaction (e.g., deposit, withdraw, transfer)
        amount: transactionDetails.depositAmount, // Set the amount for the transaction
        balance: transactionDetails.newBalance,
        date: new Date(), // Optionally, set the date for the transaction (defaults to current date)
        accountNumber: 'N/A'
    });
    return transactionObj;
} 

function createWithdrawTransaction(transactionDetails) {
    const transactionObj = new Transaction({
        type: 'Withdraw', // Set the type of transaction (e.g., deposit, withdraw, transfer)
        amount: transactionDetails.withdrawAmount, // Set the amount for the transaction
        balance: transactionDetails.newBalance,
        date: new Date(), // Optionally, set the date for the transaction (defaults to current date)
        accountNumber: 'N/A'
    });
    return transactionObj;
} 

function createTransferTransactions(transactionDetails) {
    const { sender , receiver , transAmount } = transactionDetails;
    const senderTransactionObject = new Transaction({
        type: 'Send',
        amount: transAmount,
        balance: sender.balance,
        date: new Date(),
        accountNumber: receiver.accountNumber
    });
    const receiverTransactionObject = new Transaction({
        type: 'Receive',
        amount: transAmount,
        balance: receiver.balance,
        date: new Date(),
        accountNumber: sender.accountNumber
    })
    return { senderTransactionObject , receiverTransactionObject };
}

module.exports = {
    createDepositTransaction,
    createWithdrawTransaction,
    createTransferTransactions
}