const express = require("express");
const agentController = require("../Controler/Agent");
const checkTokenMiddleware = require("../jsonwebtoken/check");

let router = express.Router();

router.get("/", checkTokenMiddleware, agentController.getAllAgents);
router.get("/:id", checkTokenMiddleware, agentController.getAgentById);
router.put("/addAgent", agentController.addAgent);
router.patch("/:id", checkTokenMiddleware, agentController.updateAgent);
router.delete("/:id", checkTokenMiddleware, agentController.deleteAgentById);

module.exports = router;
