"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainerData = exports.CREATE_CONTAINER = exports.BASE_URL = void 0;
// curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" \
// -X POST http://localhost/v1.41/containers/create 
exports.BASE_URL = "http://localhost/v1.41/";
exports.CREATE_CONTAINER = "containers/create";
// Creates new container from "react-base" image and maps them to random available port
exports.createContainerData = '{"Image": "react-base", "Cmd": [], "PortBindings": { "3000/tcp": [{ "HostPort": "0" }]}}';
