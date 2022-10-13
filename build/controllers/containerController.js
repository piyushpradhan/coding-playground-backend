"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSaveCommand = exports.executeCommand = exports.deleteContainer = exports.stopContainer = exports.startContainer = exports.getContainer = void 0;
const constants_1 = require("../utils/constants");
const dockerService = __importStar(require("../services/dockerService"));
const shellService = __importStar(require("../services/shellService"));
const databaseService = __importStar(require("../services/databaseService"));
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const getContainer = (req, res) => {
    if (req.params.containerId.trim() !== "" || req.params.containerId) {
        console.log(req.params.containerId);
        const containerId = req.params.containerId;
        res.send({
            container: containerId,
        });
    }
    else {
        res.send({
            message: constants_1.ErrorResponse.NOT_FOUND,
        });
    }
};
exports.getContainer = getContainer;
const startContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const container = yield dockerService.createContainer();
    if (container.statusCode && container.statusCode === http_status_1.default.OK) {
        yield databaseService.createNewContainer(container.container, container.reactPort.toString());
    }
    res.send(container);
});
exports.startContainer = startContainer;
const stopContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const containerId = (_a = req.params.containerId) !== null && _a !== void 0 ? _a : "";
    const stopResponse = yield dockerService.stopContainer(containerId);
    if (stopResponse.statusCode && stopResponse.statusCode === http_status_1.default.OK) {
        yield databaseService.updateContainerStatus(stopResponse.container, client_1.Status.STOPPED);
    }
    res.send(stopResponse);
});
exports.stopContainer = stopContainer;
const deleteContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const containerId = (_b = req.params.containerId) !== null && _b !== void 0 ? _b : "";
    const deleteResponse = yield dockerService.deleteContainer(containerId);
    if (deleteResponse.statusCode && deleteResponse.statusCode === http_status_1.default.OK) {
        yield databaseService.deleteContainer(deleteResponse.container);
    }
    res.send(deleteResponse);
});
exports.deleteContainer = deleteContainer;
const executeCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const containerId = (_c = req.params.containerId) !== null && _c !== void 0 ? _c : "";
    const command = (_d = req.body.command) !== null && _d !== void 0 ? _d : "";
    const output = yield shellService.executeCommand(containerId, command);
    const formatted = output.stdout;
    res.send(formatted);
});
exports.executeCommand = executeCommand;
const executeSaveCommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const containerId = (_e = req.params.containerId) !== null && _e !== void 0 ? _e : "";
    const command = (_f = req.body.command) !== null && _f !== void 0 ? _f : "";
    const output = yield shellService.executeSaveCommand(containerId, command);
    const formatted = output.stdout;
    res.send(formatted);
});
exports.executeSaveCommand = executeSaveCommand;
