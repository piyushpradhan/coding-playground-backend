import { Request, Response } from "express";
import { ErrorResponse } from "../utils/constants";
import * as dockerService from "../services/dockerService";
import * as shellService from "../services/shellService";
import * as databaseService from "../services/databaseService";
import { ContainerOpMessage, ShellOpMessage } from "../utils/types";
import { Status } from "@prisma/client";
import httpStatus from "http-status";

export const getContainer = (req: Request, res: Response) => {
  if (req.params.containerId.trim() !== "" || req.params.containerId) {
    console.log(req.params.containerId);
    const containerId = req.params.containerId;
    res.send({
      container: containerId,
    });
  } else {
    res.send({
      message: ErrorResponse.NOT_FOUND,
    });
  }
};

export const startContainer = async (req: Request, res: Response) => {
  const container: ContainerOpMessage = await dockerService.createContainer();
  if (container.statusCode && container.statusCode === httpStatus.OK) {
	await databaseService.createNewContainer(container.container, container.reactPort.toString());
  }
  res.send(container);
};

export const stopContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const stopResponse = await dockerService.stopContainer(containerId);
  if (stopResponse.statusCode && stopResponse.statusCode === httpStatus.OK) {
	await databaseService.updateContainerStatus(stopResponse.container, Status.STOPPED);
  }
  res.send(stopResponse);
};

export const deleteContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const deleteResponse = await dockerService.deleteContainer(containerId);
  if (deleteResponse.statusCode && deleteResponse.statusCode === httpStatus.OK) {
	await databaseService.deleteContainer(deleteResponse.container);
  }
  res.send(deleteResponse);
}

export const executeCommand = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const command: string = req.body.command ?? "";
  const output: ShellOpMessage = await shellService.executeCommand(containerId, command);
  const formatted: string = output.stdout!;
  res.send(formatted); 
};

export const executeSaveCommand = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const command: string = req.body.command ?? "";
  const output: ShellOpMessage = await shellService.executeSaveCommand(containerId, command);
  const formatted: string = output.stdout!;
  res.send(formatted); 
};
