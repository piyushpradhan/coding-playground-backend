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
const ErrorResponse = require("../utils/constants");
const docker = require("../services/docker");
const httpStatus = require("http-status");
const getContainer = (req, res) => {
    res.send(req.params.isRunning);
};
const startContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startResponse = yield docker.startContainer();
    console.log(startResponse);
});
const stopContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const containerId = (_a = req.params.containerId) !== null && _a !== void 0 ? _a : "";
    const stopResponse = yield docker.stopContainer(containerId);
    console.log(stopResponse);
    if (req.params.isRunning === ErrorResponse.NOT_FOUND) {
        res.send({
            message: "Container not found",
        });
    }
    else {
        res.send(stopResponse);
    }
});
module.exports = {
    getContainer,
    stopContainer,
    startContainer,
};
