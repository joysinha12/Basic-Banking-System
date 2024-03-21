const User = require("../models/user-model");
const { transactionService, depositService, withdrawService, transferService } = require("../services/transaction-services");

async function renderPage(req , res){
    try {
        await User.findById(req.params.id)
            .then((firstUser)=>{
                const showTransferButton = false;
                res.render('transfer/transfer',{
                    firstUser,
                    showTransferButton
                })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error in transfer page render')
    }
}

async function formRequest(req , res){
    try {
        const transactionObj = req.body;
        const {transferType} = req.body;

        if (transferType === 'deposit') {

            // Code to handle deposit
            console.log('Perform deposit action', );
            await depositService(transactionObj)
                .then(() => {
                    console.log("Deposit Successful");
                    res.redirect('/customers');
                })

        } else if (transferType === 'withdraw') {

            // Code to handle withdrawal
            console.log('Perform withdrawal action');
            await withdrawService(transactionObj)
                .then(() => {
                    console.log("Withdraw Successful");
                    res.redirect('/customers');
                })

        } else if (transferType === 'transfer') {

            // Code to handle transfer
            console.log('Perform transfer action');
            await transferService(transactionObj)
                .then(() =>  {
                    console.log("Transfer Successful");
                    res.redirect('/customers');
                })

        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error in transfer form request')
    }
}

module.exports = {
    renderPage,
    formRequest
}