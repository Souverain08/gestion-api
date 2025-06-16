const express = require("express");
const compteController = require("../Controler/compte");
const checkTokenMiddleware = require("../jsonwebtoken/check");

let router = express.Router();

router.get("/", checkTokenMiddleware, compteController.getAllComptes);
router.get("/:id", checkTokenMiddleware, compteController.getCompteById);
router.put("/", checkTokenMiddleware, compteController.addCompte);
router.patch("/:id", checkTokenMiddleware, compteController.updateCompte);
router.post(
  "/untrash/:id",
  checkTokenMiddleware,
  compteController.untrashCompte
);
router.delete("/trash/:id", checkTokenMiddleware, compteController.trashCompte);
router.delete("/:id", checkTokenMiddleware, compteController.deleteCompteById);

module.exports = router;
