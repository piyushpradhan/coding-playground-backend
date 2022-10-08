"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var containerController_1 = require("../controllers/containerController");
var manageContainers_1 = require("../middlewares/manageContainers");
router.get("/:containerId", [manageContainers_1.checkIfContainerIsRunning], containerController_1.getContainer);
router.post("/start", containerController_1.startContainer);
router.post("/:containerId/stop", [manageContainers_1.checkIfContainerIsRunning], containerController_1.stopContainer);
exports.default = router;
