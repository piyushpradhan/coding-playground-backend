import express from "express";
const router = express.Router();
import {
  getContainer,
  startContainer,
  stopContainer,
} from "../controllers/containerController";
import { checkIfContainerIsRunning } from "../middlewares/manageContainers";

router.get("/:containerId", [checkIfContainerIsRunning], getContainer);

router.post("/start", startContainer);

router.post("/:containerId/stop", [checkIfContainerIsRunning], stopContainer);

export default router;
