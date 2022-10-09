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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContainer = exports.stopContainer = exports.createContainer = exports.checkIfContainerExists = void 0;
var node_docker_api_1 = require("node-docker-api");
var http_status_1 = __importDefault(require("http-status"));
var util_1 = __importDefault(require("util"));
var dockerHelper_1 = require("../utils/dockerHelper");
var exec = util_1.default.promisify(require("child_process").exec);
var docker = new node_docker_api_1.Docker({ socketPath: "/run/docker.sock" });
var checkIfContainerExists = function (containerId) { return __awaiter(void 0, void 0, void 0, function () {
    var container, containerInfo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                container = docker.container.get(containerId);
                return [4 /*yield*/, container.status()];
            case 1:
                containerInfo = _a.sent();
                console.log(containerInfo);
                return [2 /*return*/, container.id];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, ""];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkIfContainerExists = checkIfContainerExists;
var startContainer = function (containerId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, stdout, stderr, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exec("curl --unix-socket /var/run/docker.sock -X POST http://localhost/v1.41/containers/".concat(containerId, "/start"))];
            case 1:
                _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                return [2 /*return*/, stdout];
            case 2:
                err_2 = _b.sent();
                throw err_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
var createContainer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, stdout, stderr, containerId, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, exec("curl --unix-socket /var/run/docker.sock -H \"Content-Type: application/json\" -d '".concat(dockerHelper_1.createContainerData, "' -X POST http://localhost/v1.41/containers/create"))];
            case 1:
                _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                containerId = JSON.parse(stdout)["Id"];
                return [4 /*yield*/, startContainer(containerId)];
            case 2:
                _b.sent();
                return [2 /*return*/, {
                        "statusCode": http_status_1.default.OK,
                        "container": containerId
                    }];
            case 3:
                e_1 = _b.sent();
                throw e_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createContainer = createContainer;
var stopContainer = function (containerId) { return __awaiter(void 0, void 0, void 0, function () {
    var container, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                container = docker.container.get(containerId);
                return [4 /*yield*/, container.stop()];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        "statusCode": http_status_1.default.OK,
                        "containerId": container.id
                    }];
            case 2:
                err_3 = _a.sent();
                throw err_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.stopContainer = stopContainer;
var deleteContainer = function (containerId) { return __awaiter(void 0, void 0, void 0, function () {
    var container, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                container = docker.container.get(containerId);
                return [4 /*yield*/, container.delete()];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        "statusCode": http_status_1.default.OK,
                        "containerId": container.id
                    }];
            case 2:
                err_4 = _a.sent();
                throw err_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteContainer = deleteContainer;
