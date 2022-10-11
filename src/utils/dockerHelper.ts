// Creates new container from "react-base" image and maps them to random available port
export const createContainerData: string = '{"Image": "playground", "Cmd": [], "PortBindings": { "3000/tcp": [{ "HostPort": "0" }], "22/tcp": [{ "HostPort": "0" }]}}';
