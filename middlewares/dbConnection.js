const mongoose = require("mongoose");
const connectToDB = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
            .then(()=> console.log("Successfully connected to MongoDB"))
    } catch (error) {
        console.log(error);
        throw new Error("Cannot Connect to MongoDB");
    }
}

module.exports = {connectToDB};