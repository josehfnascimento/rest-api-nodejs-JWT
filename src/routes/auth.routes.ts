import { Router } from "express";
import { AuthUserController } from "../modules/users/useCases/authenticate/AuthUserController";

const authRouter = Router();

authRouter.post("/", (req, res) => {
        const authUserController = new AuthUserController();
        return authUserController.authenticate(req, res);
});

export default authRouter;
