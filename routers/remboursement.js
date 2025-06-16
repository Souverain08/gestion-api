const express = require("express");
const remboursementController = require("../Controler/Remboursement");
const checkTokenMiddleware = require("../jsonwebtoken/check");

let router = express.Router();

router.get(
  "/",
  checkTokenMiddleware,
  remboursementController.getAllRemboursements
);
router.get(
  "/:id",
  checkTokenMiddleware,
  remboursementController.getRemboursementById
);
router.put("/", checkTokenMiddleware, remboursementController.addRemboursement);
router.patch(
  "/:id",
  checkTokenMiddleware,
  remboursementController.updateRemboursement
);
router.delete(
  "/:id",
  checkTokenMiddleware,
  remboursementController.deleteRemboursementById
);

module.exports = router;
