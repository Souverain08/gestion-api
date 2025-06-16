const express = require("express");
const clientController = require("../Controler/Client");
const checkTokenMiddleware = require("../jsonwebtoken/check");

let router = express.Router();

router.get(
  "/getAllClient",
  //   checkTokenMiddleware,
  clientController.getAllClients
);
router.get("/:id", clientController.getClientById);
router.put("/", clientController.addClient);
router.patch("/:id", clientController.updateClient);
router.post("/untrash/:id", clientController.untrashClient);
router.delete("/trash/:id", clientController.trashClient);
router.delete("/:id", checkTokenMiddleware, clientController.deleteClientById);

module.exports = router;
