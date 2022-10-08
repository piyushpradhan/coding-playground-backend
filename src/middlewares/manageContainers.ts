import { NextFunction, Request, Response } from "express";
const ErrorResponse = require("../utils/constants");
const docker = require("../services/docker");

const checkIfContainerIsRunning = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isRunning = await docker.checkIfContainerExists(req.params.containerId);
  if (isRunning.id != null) req.params.isRunning = isRunning;
  else req.params.isRunning = ErrorResponse.NOT_FOUND;
  next();
};

module.exports = {
  checkIfContainerIsRunning,
};
