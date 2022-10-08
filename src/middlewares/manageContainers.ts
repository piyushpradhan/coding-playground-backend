import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/constants";
import { checkIfContainerExists } from "../services/dockerService";
import { ResponseMessageType } from "../utils/types";
import { Container } from "node-docker-api/lib/container";

export const checkIfContainerIsRunning = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isRunning: ResponseMessageType | Container =
    await checkIfContainerExists(req.params.containerId);
  req.params.isRunning = isRunning.toString();
  // else req.params.isRunning = ErrorResponse.NOT_FOUND;
  next();
};

export const generateContainerName = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
