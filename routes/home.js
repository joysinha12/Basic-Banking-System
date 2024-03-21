const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/" , (req , res) => {
    const showTransferButton = false;
    res.render('home' , {
        showTransferButton
    });
});

module.exports = homeRouter;