"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainerData = void 0;
// Creates new container from "react-base" image and maps them to random available port
exports.createContainerData = '{"Image": "playground", "Cmd": [], "PortBindings": { "3000/tcp": [{ "HostPort": "0" }], "22/tcp": [{ "HostPort": "0" }]}}';
