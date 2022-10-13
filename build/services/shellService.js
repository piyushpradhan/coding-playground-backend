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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSaveCommand = exports.executeCommand = void 0;
const util_1 = __importDefault(require("util"));
const exec = util_1.default.promisify(require("child_process").exec);
const executeCommand = (containerId, command) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout, stderr } = yield exec(`docker exec -i ${containerId} sh -c '${command}'`);
        const output = {
            stdout: stdout,
            stderr: stderr,
        };
        return output;
    }
    catch (err) {
        const errResponse = {
            stdout: null,
            stderr: err.message
        };
        return errResponse;
    }
});
exports.executeCommand = executeCommand;
const executeSaveCommand = (containerId, command) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout, stderr } = yield exec(`docker exec -i ${containerId} sh -c "${command}"`);
        const output = {
            stdout: stdout,
            stderr: stderr,
        };
        return output;
    }
    catch (err) {
        const errResponse = {
            stdout: null,
            stderr: err.message
        };
        return errResponse;
    }
});
exports.executeSaveCommand = executeSaveCommand;
