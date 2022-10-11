import express from "express";
const router = express.Router();
import {
  deleteContainer,
  executeCommand,
  getContainer,
  startContainer,
  stopContainer,
} from "../controllers/containerController";
import { checkIfContainerIsRunning } from "../middlewares/manageContainers";

router.get("/:containerId", [checkIfContainerIsRunning], getContainer);

router.post("/start", startContainer);

router.post("/:containerId/stop", [checkIfContainerIsRunning], stopContainer);

router.post("/:containerId/delete", [checkIfContainerIsRunning], deleteContainer);

router.post("/:containerId/exec", [checkIfContainerIsRunning], executeCommand);

export default router;
