import { Request, Response } from "express";
import { ErrorResponse } from "../utils/constants";
import * as dockerService from "../services/dockerService";
import httpStatus from "http-status";

export const getContainer = (req: Request, res: Response) => {
  res.send(req.params.isRunning);
};

export const startContainer = async (req: Request, res: Response) => {
  const startResponse = await dockerService.startContainer();
  console.log(startResponse);
};

export const stopContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const stopResponse = await dockerService.stopContainer(containerId);
  console.log(stopResponse);
  res.send(stopResponse);
};
