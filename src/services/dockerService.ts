import { Docker } from "node-docker-api";
import httpStatus from "http-status";
import util from "util";
import { createContainerData } from "../utils/dockerHelper";
const exec = util.promisify(require("child_process").exec);
const docker = new Docker({ socketPath: "/run/docker.sock" });

export const checkIfContainerExists = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    return container.id;
  } catch (err) {
    return "";
  }
};

const getMappedPort = async (containerId: string) => {
  try {
	const { stdout } = await exec(`curl --unix-socket /var/run/docker.sock -X GET http://localhost/v1.41/containers/${containerId}/json`)
	const containerInfo = JSON.parse(stdout);
	const port = containerInfo.NetworkSettings.Ports["3000/tcp"][0].HostPort;
	return port;
  } catch (err) {
	throw err;
  }
}

const startContainer = async (containerId: string) => {
  try {
	const { stdout } = await exec(`curl --unix-socket /var/run/docker.sock -X POST http://localhost/v1.41/containers/${containerId}/start`)	
	return stdout;
  } catch (err) {
	throw err;
  }
}

export const createContainer = async () => {
  try {
	const { stdout } = await exec(`curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" -d '${createContainerData}' -X POST http://localhost/v1.41/containers/create`)	
	const containerId = JSON.parse(stdout)["Id"];	
	await startContainer(containerId);
	const port = await getMappedPort(containerId);
	return {
	  "statusCode": httpStatus.OK,
	  "container": containerId,
	  "port": port 
	};
  } catch (e) {
    throw e;
  }
};

export const stopContainer = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    await container.stop();
    return {
	  "statusCode": httpStatus.OK,
	  "container": container.id
	};
  } catch (err) {
    throw err;
  }
};

export const deleteContainer = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    await container.delete();
    return {
	  "statusCode": httpStatus.OK,
	  "container": container.id
	};
  } catch (err) {
    throw err;
  }
};
