"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const containerController_1 = require("../controllers/containerController");
const manageContainers_1 = require("../middlewares/manageContainers");
const containerController_2 = require("../controllers/containerController");
router.get("/:containerId", [manageContainers_1.checkIfContainerIsRunning], containerController_1.getContainer);
router.post("/start", containerController_1.startContainer);
router.post("/:containerId/stop", [manageContainers_1.checkIfContainerIsRunning], containerController_1.stopContainer);
router.post("/:containerId/delete", [manageContainers_1.checkIfContainerIsRunning], containerController_1.deleteContainer);
router.post("/:containerId/exec", [manageContainers_1.checkIfContainerIsRunning], containerController_1.executeCommand);
router.post("/:containerId/save", [manageContainers_1.checkIfContainerIsRunning], containerController_2.executeSaveCommand);
exports.default = router;
