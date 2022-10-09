import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewContainer = async (containerId: string, port: string) => {
  try {
	await prisma.container.create({
	  data: {
		id: 1,
		container_id: containerId,
		status: Status.RUNNING,
		host_port: parseInt(port)
	  }
	});
  } catch (err) {
	throw err;
  }
}

export const updateContainerStatus = async (containerId: string, status: Status) => {
  try {
	await prisma.container.update({
	  where: {
		container_id: containerId
	  }, 
	  data: {
		status: status
	  }
	});
  } catch (err) {
	throw err;
  }
}

export const deleteContainer = async (containerId: string) => {
  try {
	await prisma.container.delete({
	  where: {
		container_id: containerId
	  }, 
	});	
  } catch (err) {
	throw err;	
  }
}
