const { Docker } = require("node-docker-api");
const httpStatus = require("http-status");
const generateContainerName = require("../utils/generate");
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const checkIfContainerExists = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    const containerInfo = await container.status();
    return containerInfo;
  } catch (e) {
    return {
      statusCode: httpStatus.NOT_FOUND,
      message: "Container not found",
    };
  }
};

const createContainer = async (containerName: string) => {
  const container = await docker.container.create({
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
};

const startContainer = async () => {
  try {
    const containerName = generateContainerName();
    const container = await createContainer("react");
    // start the container
    await container.start();
    return {
      statusCode: httpStatus.OK,
      message: "Container started",
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
    };
  }
};

const stopContainer = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    await container.stop();
    return {
      statusCode: httpStatus.OK,
      message: "Container stopped",
    };
  } catch (e) {
    return {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
    };
  }
};

const deleteContainer = async (containerId: string) => {
  try {
    const container = docker.container.get(containerId);
    await container.delete();
    return {
      statusCode: httpStatus.OK,
      message: "Container deleted",
    };
  } catch (e) {
    return {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
    };
  }
};

module.exports = {
  checkIfContainerExists,
  stopContainer,
  deleteContainer,
  startContainer,
};
