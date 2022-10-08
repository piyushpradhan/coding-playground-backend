import { Docker } from "node-docker-api";
import Dockerode from "dockerode";
import { generateContainerName } from "../middlewares/manageContainers";
import httpStatus from "http-status";
import { ResponseMessageType } from "../utils/types";
const docker = new Docker({ socketPath: "/var/run/docker.sock" });
const dockerode = new Dockerode({ socketPath: "/var/run/docker.sock" });

export const checkIfContainerExists = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    const containerInfo = await container.status();
    return containerInfo;
  } catch (e) {
    const errorMessage: ResponseMessageType = {
      statusCode: httpStatus.NOT_FOUND,
      message: "Container not found",
    };
    throw errorMessage;
  }
};

export const createContainer = async (containerName: string) => {
  dockerode
    .createContainer({
      Image: "node:16.17.0",
      name: containerName,
      Cmd: ["tail", "-f", "/dev/null"],
      Tty: true,
      OpenStdin: true,
      StdinOnce: true,
      HostConfig: {
        AutoRemove: true,
        Binds: ["/var/run/docker.sock:/var/run/docker.sock"],
      },
    })
    .then((container: any) => {
      container.start();
      return container;
    });
};

export const startContainer = async () => {
  try {
    const containerName = generateContainerName();
    await createContainer(containerName);
    const errorMessage: ResponseMessageType = {
      statusCode: httpStatus.OK,
      message: "Container started",
    };
    return errorMessage;
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
