import express from "express";
import containerRouter from "./containerRoutes";

const router = express.Router();

router.use("/containers", containerRouter);

export default router;
