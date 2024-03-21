const User = require("../models/user-model")

async function getUserByAccNumber(accountNumber) {
    try {
        const user = await User.findOne({accountNumber})
        return user;
    } catch (error) {
        console.log(error);
    }
}

function saveUpdatedUser(user) {
    try {
        User.findOneAndUpdate({accountNumber: user.accountNumber}, user , {returnOriginal: false})
            .then(()=>{
                console.log('Successful update');
            })
            .catch((err)=>{
                throw new Error(err)
            })
    } catch (error) {
        console.log(error);
        throw new Error('Error in updating user');
    }
}


module.exports = {
    getUserByAccNumber,
    saveUpdatedUser
}