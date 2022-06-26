import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/create/CreateUserController";

const userRouter = Router();

userRouter.post("/", (req, res) => {
        const createUserController = new CreateUserController();
        return createUserController.handle(req, res);
});

export default userRouter;
