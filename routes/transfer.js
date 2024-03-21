const express = require("express");
const { transferController } = require("../controllers");
const transferRouter = express.Router();

transferRouter.post("/" , transferController.formRequest)
transferRouter.get("/:id", transferController.renderPage);

module.exports = transferRouter;
