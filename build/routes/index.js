"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var containerRoutes_1 = __importDefault(require("./containerRoutes"));
var router = express_1.default.Router();
router.use("/containers", containerRoutes_1.default);
exports.default = router;
