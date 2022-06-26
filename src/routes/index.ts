import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const routes = Router();

routes.use("/users", authMiddleware, userRouter);
routes.use("/auth", authRouter);

export default routes;
