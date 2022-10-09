import { Docker } from "node-docker-api";
import Dockerode from "dockerode";
import { generateContainerName } from "../middlewares/manageContainers";
import httpStatus from "http-status";
import { ResponseMessageType } from "../utils/types";
const docker = new Docker({ socketPath: "/run/docker.sock" });
const dockerode = new Dockerode({ socketPath: "/run/docker.sock" });

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

export const buildImage = async (containerName: string) => {
  dockerode.buildImage({
	context: __dirname,
	src: ['src/template/Dockerfile']
  }, {t: "react-base"}, function (err, response) {
	console.log(err);
	console.log(response);
  });
}

export const createContainer = async (containerName: string) => {
  const createdContainer = await docker.container.create({
    Image: "node:16.17.0",
    name: containerName,
    envPath: "/app/node_modules/.bin:$PATH",
    copy: [
      {
        src: "/app",
        dest: "/app",
        options: {
          chown: "node:node",
        },
      },
      {
        src: "/app/package.json",
        dest: "/app/package.json",
      },
      {
        src: "/app/package-lock.json",
        dest: "/app/package-lock.json",
      },
    ],
    workingDir: "/app",
    Cmd: ["npm", "install", "&&", "npm", "start"],
    Tty: true,
    OpenStdin: true,
    StdinOnce: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    ExposedPorts: {
      "3000/tcp": {},
    },
    HostConfig: {
      PortBindings: {
        "3000/tcp": [
          {
            HostPort: "9000",
          },
        ],
      },
    },
  });
  createdContainer.attach({
    stream: true,
    stdin: true,
    stdout: true,
    stderr: true,
  });
  return createdContainer;
};

export const startContainer = async () => {
  try {
	dockerode.run("react-base", ["npm start"], process.stdout, function (err: any, data: any, container: any) {
	  console.log(err);
	  console.log("data", data);
	  console.log("container", container);
	})
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
