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
  const container = await dockerService.startContainer();
  // update database with new container ID, port and status
  console.log(container);
};

export const stopContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const stopResponse = await dockerService.stopContainer(containerId);
  console.log(stopResponse);
  res.send(stopResponse);
};
