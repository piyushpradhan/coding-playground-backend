"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContainerName = exports.checkIfContainerIsRunning = void 0;
const dockerService_1 = require("../services/dockerService");
const checkIfContainerIsRunning = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const containerId = req.params.containerId;
    const container = yield (0, dockerService_1.checkIfContainerExists)(containerId);
    req.params.containerId = container !== null && container !== void 0 ? container : "";
    next();
});
exports.checkIfContainerIsRunning = checkIfContainerIsRunning;
const generateContainerName = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateContainerName = generateContainerName;
