const express = require("express");
const { customerController } = require("../controllers");
const customerRouter = express.Router();

customerRouter.get("/" , customerController.getAllCusomers);
customerRouter.get('/:id' , customerController.getCustomer);

module.exports = customerRouter;