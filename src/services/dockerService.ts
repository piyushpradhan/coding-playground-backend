import { Docker } from "node-docker-api";
import httpStatus from "http-status";
import { ResponseMessageType } from "../utils/types";
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

export const startContainer = async () => {
  try {
	const { stdout, stderr } = await exec(`curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" -d '${createContainerData}' -X POST http://localhost/v1.41/containers/create`)	
	return stdout;
  } catch (e) {
    return e;
  }
};

export const stopContainer = async (containerId: string) => {
  try {
    const containerInfo = await checkIfContainerExists(containerId);
    const container = docker.container.get(containerId);
    await container.stop();
    const errorMessage: ResponseMessageType = {
      statusCode: httpStatus.OK,
      message: "Container stopped",
    };
    return errorMessage;
  } catch (e) {
    throw e;
  }
};

export const deleteContainer = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    await container.delete();
    const errorMessage: ResponseMessageType = {
      statusCode: httpStatus.OK,
      message: "Container deleted",
    };
    return errorMessage;
  } catch (e) {
    throw e;
  }
};
