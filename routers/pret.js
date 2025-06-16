const express = require("express");
const pretController = require("../Controler/Pret");
const checkTokenMiddleware = require("../jsonwebtoken/check");

let router = express.Router();

router.get("/", checkTokenMiddleware, pretController.getAllPrets);
router.get("/:id", checkTokenMiddleware, pretController.getPretById);
router.put("/", checkTokenMiddleware, pretController.addPret);
router.patch("/:id", checkTokenMiddleware, pretController.updatePret);
router.delete("/:id", checkTokenMiddleware, pretController.deletePretById);

module.exports = router;
