const transactionSchema = require("../models/transaction-schema");
const { getUserByAccNumber, saveUpdatedUser } = require("../repositories/crud-repositories");
const { createDepositTransaction, createWithdrawTransaction, createTransferTransactions } = require("../utils/createTransactionObject");

async function depositService (transactionObj) {
    console.log("depositService");
    const {senderAccountNumber , transferAmount} = transactionObj;
    const depositAmount = Number(transferAmount);
    try {
        //  1. We need to extract the user
        await getUserByAccNumber(senderAccountNumber)
            .then((user)=>{
                //  2. We need to edit the balance of the user
                const newBalance = user.balance + depositAmount;
                user.balance = newBalance;
                //  3. We need to generate the transaction object
                const newTransaction = createDepositTransaction({newBalance , depositAmount});
                console.log(newTransaction);
                //  4. push the transaction object in the transactionHistory
                user.transactionHistory = [newTransaction, ...user.transactionHistory];
                console.log(newBalance , user.transactionHistory);
                // //  5. save the edited user and return the success of the deposite service
                try {
                    saveUpdatedUser(user);
                } catch (error) {
                    console.log(error);
                } 
            })
            .catch((err) => console.log("no user found in deposit" , err));
        
    } catch (error) {
        console.log("Error occured while deposit Service" , error);
    }
}

async function withdrawService (transactionObj) {
    console.log("withdrawService");
    const {senderAccountNumber , transferAmount} = transactionObj;
    const withdrawAmount = Number(transferAmount);
    console.log(senderAccountNumber , transferAmount);
    try {
        //  1. We need to extract the user
        const user = await getUserByAccNumber(senderAccountNumber)
        if(!user){
            throw new Error("Error occured while finding user in withdraw");
        } else {
            //  2. We need to check the balance of the user and accordingly proceed with generation an error or editing the balance
            const newBalance = user.balance - withdrawAmount;
            user.balance = newBalance;
            //  3. We need to generate the transaction object if the transaction is successful
            const newTransaction = createWithdrawTransaction({newBalance , withdrawAmount});
            console.log(newTransaction);
            //  4. push the transaction object in the transactionHistory
            user.transactionHistory = [newTransaction, ...user.transactionHistory];
            console.log(newBalance , user.transactionHistory);
            //  5. save the edited user and return the success of the withdraw service
            try {
                saveUpdatedUser(user);
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log("Error occured while withdraw Service");
    }
}

async function transferService (transactionObj) {
    console.log("transferService");
    const {senderAccountNumber , transferAmount , receiverAccountNumber} = transactionObj;
    const transAmount = Number(transferAmount);
    console.log(senderAccountNumber , transferAmount , receiverAccountNumber);
    try {
        //  1. We need to extract the user
        const sender = await getUserByAccNumber(senderAccountNumber)
        if(!sender){
            throw new Error("Error occured while finding sender user in transfer");
        } else {
            //  2a. Extract the second user
            const receiver = await getUserByAccNumber(receiverAccountNumber)
            if(!receiver){
                throw new Error("Error occured while finding receiver user in transfer");
            } else {
                //  2b. We need to check the balance of the user and accordingly proceed with generation an error or editing the balance
                const senderNewBalance = sender.balance - transAmount;
                sender.balance = senderNewBalance;
                //  2c. Edit receiver balance
                const receiverNewBalance = receiver.balance + transAmount;
                receiver.balance = receiverNewBalance;
                //  3. We need to generate the transactionHistory object for the sender and receiver the transaction is successful
                const { senderTransactionObject , receiverTransactionObject } = createTransferTransactions({sender , receiver , transAmount});
                console.log(senderTransactionObject , receiverTransactionObject);
                //  4. push the transaction object in the transactionHistory for sender and receiver
                sender.transactionHistory = [senderTransactionObject, ...sender.transactionHistory];
                console.log('SENDER TRANSACTION HISTORY: => ' , sender.transactionHistory);
                
                receiver.transactionHistory = [receiverTransactionObject, ...receiver.transactionHistory];
                console.log('RECEIVER TRANSACTION HISTORY: => ' , receiver.transactionHistory);
                //  5. save the edited users and return the success of the transfer service
                try {
                    saveUpdatedUser(sender);
                } catch (error) {
                    console.log(error);
                }
                try {
                    saveUpdatedUser(receiver);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (error) {
        console.log("Error occured while transfer Service");
    }
}

module.exports = {
    depositService,
    withdrawService,
    transferService
}