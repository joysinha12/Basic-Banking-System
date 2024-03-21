const User = require("../models/user-model");

async function getAllCusomers(req , res) { 
    try {
        await User.find()
            .then((customers)=>{
                const showTransferButton = false;
                res.render('customer/customers' , {
                    Customers: customers,
                    showTransferButton
                });    
            });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error in calling all customers')
    }
}

async function getCustomer(req , res) {
    try {
        const custId = req.params.id;
        await User.findById(custId)
            .then((customer)=>{
                const showTransferButton = true;
                res.render('customer/customer' , {
                    customer: customer,
                    showTransferButton,
                    custId
                });    
            });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error in calling single customer')
    }
}

module.exports = {
    getAllCusomers,
    getCustomer
};