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
exports.deleteContainer = exports.updateContainerStatus = exports.createNewContainer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createNewContainer = (containerId, reactPort) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.container.create({
            data: {
                id: 1,
                container_id: containerId,
                status: client_1.Status.RUNNING,
                react_port: parseInt(reactPort),
            }
        });
    }
    catch (err) {
        throw err;
    }
});
exports.createNewContainer = createNewContainer;
const updateContainerStatus = (containerId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.container.update({
            where: {
                container_id: containerId
            },
            data: {
                status: status
            }
        });
    }
    catch (err) {
        throw err;
    }
});
exports.updateContainerStatus = updateContainerStatus;
const deleteContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.container.delete({
            where: {
                container_id: containerId
            },
        });
    }
    catch (err) {
        throw err;
    }
});
exports.deleteContainer = deleteContainer;
