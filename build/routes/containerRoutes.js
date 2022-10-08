"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const containerController = require("../controllers/containerController");
const manageContainers = require("../middlewares/manageContainers");
router.get("/:containerId", [manageContainers.checkIfContainerIsRunning], containerController.getContainer);
router.post("/start", [manageContainers.checkIfContainerIsRunning], containerController.startContainer);
router.post("/:containerId/stop", [manageContainers.checkIfContainerIsRunning], containerController.stopContainer);
module.exports = router;
