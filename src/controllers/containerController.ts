import { Request, Response } from "express";
const ErrorResponse = require("../utils/constants");
const docker = require("../services/docker");
const httpStatus = require("http-status");

const getContainer = (req: Request, res: Response) => {
  res.send(req.params.isRunning);
};

const startContainer = async (req: Request, res: Response) => {
  const startResponse = await docker.startContainer();
  console.log(startResponse);
};

const stopContainer = async (req: Request, res: Response) => {
  const containerId: string = req.params.containerId ?? "";
  const stopResponse = await docker.stopContainer(containerId);
  console.log(stopResponse);
  if (req.params.isRunning === ErrorResponse.NOT_FOUND) {
    res.send({
      message: "Container not found",
    });
  } else {
    res.send(stopResponse);
  }
};

module.exports = {
  getContainer,
  stopContainer,
  startContainer,
};
