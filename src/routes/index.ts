import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import userRouter from "./users.routes";
import productRouter from "./products.routes";
import authRouter from "./auth.routes";

const routes = Router();


routes.use("/users", userRouter);
routes.use("/auth", authRouter);
routes.use("/products", authMiddleware, productRouter);

export default routes;
