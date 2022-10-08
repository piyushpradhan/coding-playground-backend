import express from "express";
const router = express.Router();
const containerController = require("../controllers/containerController");
const manageContainers = require("../middlewares/manageContainers");

router.get(
  "/:containerId",
  [manageContainers.checkIfContainerIsRunning],
  containerController.getContainer
);

router.post(
  "/start",
  [manageContainers.checkIfContainerIsRunning],
  containerController.startContainer
);

router.post(
  "/:containerId/stop",
  [manageContainers.checkIfContainerIsRunning],
  containerController.stopContainer
);

module.exports = router;
