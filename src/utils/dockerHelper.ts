// curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" \
// -X POST http://localhost/v1.41/containers/create 
export const BASE_URL: string = "http://localhost/v1.41/";
export const CREATE_CONTAINER: string = "containers/create";
// Creates new container from "react-base" image and maps them to random available port
export const createContainerData: string = '{"Image": "react-base", "Cmd": [], "PortBindings": { "3000/tcp": [{ "HostPort": "0" }]}}';
