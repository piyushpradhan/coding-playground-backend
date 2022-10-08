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
const { Docker } = require("node-docker-api");
const httpStatus = require("http-status");
const generateContainerName = require("../utils/generate");
const docker = new Docker({ socketPath: "/var/run/docker.sock" });
const checkIfContainerExists = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.container.get(containerId);
        const containerInfo = yield container.status();
        return containerInfo;
    }
    catch (e) {
        return {
            statusCode: httpStatus.NOT_FOUND,
            message: "Container not found",
        };
    }
});
const createContainer = (containerName) => __awaiter(void 0, void 0, void 0, function* () {
    const container = yield docker.container.create({
        Image: "react-base",
        name: containerName,
        Env: ["PORT=3000"],
        ExposedPorts: {
            "3000/tcp": {},
        },
        HostConfig: {
            PortBindings: {
                "3000/tcp": [
                    {
                        HostPort: "3000",
                    },
                ],
            },
        },
    });
    return container;
});
const startContainer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const containerName = generateContainerName();
        const container = yield createContainer("react");
        // start the container
        yield container.start();
        return {
            statusCode: httpStatus.OK,
            message: "Container started",
        };
    }
    catch (e) {
        console.log(e);
        return {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong",
        };
    }
});
const stopContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.container.get(containerId);
        yield container.stop();
        return {
            statusCode: httpStatus.OK,
            message: "Container stopped",
        };
    }
    catch (e) {
        return {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong",
        };
    }
});
const deleteContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.container.get(containerId);
        yield container.delete();
        return {
            statusCode: httpStatus.OK,
            message: "Container deleted",
        };
    }
    catch (e) {
        return {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong",
        };
    }
});
module.exports = {
    checkIfContainerExists,
    stopContainer,
    deleteContainer,
    startContainer,
};
