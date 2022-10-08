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
const checkIfContainerIsRunning = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isRunning = yield docker.checkIfContainerExists(req.params.containerId);
    if (isRunning.id != null)
        req.params.isRunning = isRunning;
    else
        req.params.isRunning = ErrorResponse.NOT_FOUND;
    next();
});
module.exports = {
    checkIfContainerIsRunning,
};
