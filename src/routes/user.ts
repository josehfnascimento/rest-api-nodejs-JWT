import { Router } from "express";

const userRouter = Router();

userRouter.post("/users", (req, res) => {
        return res.status(201).send();
});

export default userRouter;
