import { Request, Response } from "express";
import { ErrorResponse } from "../utils/constants";
import * as dockerService from "../services/dockerService";
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
  const container = await dockerService.createContainer();
  // TODO: update database with new container ID, port and status
  res.send(container);
};

export const stopContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const stopResponse = await dockerService.stopContainer(containerId);
  // TODO: update container status in database
  res.send(stopResponse);
};

export const deleteContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const deleteResponse = await dockerService.deleteContainer(containerId);
  // TODO: remove container from database
  res.send(deleteResponse);
}
