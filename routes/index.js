const express = require("express");
const router = express.Router();
const customerRouter = require("./customers");
const homeRouter = require("./home");
const transferRouter = require("./transfer");

router.use('/' , homeRouter);
router.use('/customers' , customerRouter);
router.use('/transfer' , transferRouter)

module.exports = router;