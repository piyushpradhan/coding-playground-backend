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
exports.deleteContainer = exports.stopContainer = exports.createContainer = exports.checkIfContainerExists = void 0;
const node_docker_api_1 = require("node-docker-api");
const http_status_1 = __importDefault(require("http-status"));
const util_1 = __importDefault(require("util"));
const dockerHelper_1 = require("../utils/dockerHelper");
const exec = util_1.default.promisify(require("child_process").exec);
const docker = new node_docker_api_1.Docker({ socketPath: "/run/docker.sock" });
const BASE_URL = process.env.BASE_URL;
const checkIfContainerExists = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.container.get(containerId);
        return container.id;
    }
    catch (err) {
        return "";
    }
});
exports.checkIfContainerExists = checkIfContainerExists;
const getMappedPort = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield exec(`curl --unix-socket /var/run/docker.sock -X GET ${BASE_URL}/containers/${containerId}/json`);
        const containerInfo = JSON.parse(stdout);
        const reactPort = containerInfo.NetworkSettings.Ports["3000/tcp"][0].HostPort;
        return reactPort;
    }
    catch (err) {
        throw err;
    }
});
const startContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield exec(`curl --unix-socket /var/run/docker.sock -X POST ${BASE_URL}/containers/${containerId}/start`);
        return stdout;
    }
    catch (err) {
        throw err;
    }
});
const createContainer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield exec(`curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" -d '${dockerHelper_1.createContainerData}' -X POST ${BASE_URL}/containers/create`);
        const containerId = JSON.parse(stdout)["Id"];
        yield startContainer(containerId);
        const reactPort = yield getMappedPort(containerId);
        return {
            "statusCode": http_status_1.default.OK,
            "container": containerId,
            "reactPort": reactPort,
        };
    }
    catch (e) {
        throw e;
    }
});
exports.createContainer = createContainer;
const stopContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.container.get(containerId);
        yield container.stop();
        return {
            "statusCode": http_status_1.default.OK,
            "container": container.id
        };
    }
    catch (err) {
        throw err;
    }
});
exports.stopContainer = stopContainer;
const deleteContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.container.get(containerId);
        yield container.delete();
        return {
            "statusCode": http_status_1.default.OK,
            "container": container.id
        };
    }
    catch (err) {
        throw err;
    }
});
exports.deleteContainer = deleteContainer;
