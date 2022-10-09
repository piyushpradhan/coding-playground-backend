import { Docker } from "node-docker-api";
import httpStatus from "http-status";
import util from "util";
import { createContainerData } from "../utils/dockerHelper";
const exec = util.promisify(require("child_process").exec);
const docker = new Docker({ socketPath: "/run/docker.sock" });

export const checkIfContainerExists = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    const containerInfo = await container.status();
    console.log(containerInfo);
    return container.id;
  } catch (err) {
    return "";
  }
};

const startContainer = async (containerId: string) => {
  try {
	const { stdout, stderr } = await exec(`curl --unix-socket /var/run/docker.sock -X POST http://localhost/v1.41/containers/${containerId}/start`)	
	return stdout;
  } catch (err) {
	throw err;
  }
}

export const createContainer = async () => {
  try {
	const { stdout , stderr } = await exec(`curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" -d '${createContainerData}' -X POST http://localhost/v1.41/containers/create`)	
	const containerId = JSON.parse(stdout)["Id"];	
	await startContainer(containerId);
	return {
	  "statusCode": httpStatus.OK,
	  "container": containerId
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
	  "containerId": container.id
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
	  "containerId": container.id
	};
  } catch (err) {
    throw err;
  }
};
