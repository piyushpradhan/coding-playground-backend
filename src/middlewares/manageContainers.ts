import { NextFunction, Request, Response } from "express";
import { checkIfContainerExists } from "../services/dockerService";

export const checkIfContainerIsRunning = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const containerId = req.params.containerId;
  const container = await checkIfContainerExists(containerId);
  req.params.containerId = container ?? "";
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
