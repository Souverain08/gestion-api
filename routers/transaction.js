const express = require("express");
const transactionController = require("../Controler/Transaction");
const checkTokenMiddleware = require("../jsonwebtoken/check");

let router = express.Router();

router.get("/", checkTokenMiddleware, transactionController.getAllTransactions);
router.get(
  "/:id",
  checkTokenMiddleware,
  transactionController.getTransactionById
);
router.put("/", transactionController.addTransaction);
router.patch(
  "/:id",
  checkTokenMiddleware,
  transactionController.updateTransaction
);
router.delete(
  "/:id",
  checkTokenMiddleware,
  transactionController.deleteTransactionById
);

module.exports = router;
