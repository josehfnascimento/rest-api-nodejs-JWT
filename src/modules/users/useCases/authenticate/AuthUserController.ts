import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
    async authenticate(request: Request, response: Response): Promise<Response> {
        const authUserUseCase = container.resolve(AuthUserUseCase);
        try {
            const { email, password } = request.body;
            const data = { email, password };
            const schema = Yup.object({
                email: Yup.string().required("O email é obrigatório!")
                    .email("Preencha um email válido!"),
                password: Yup.string().required("A senha é obrigatória!")
                    .min(6, "A senha precisa ter no mínimo 6 caracteres.")
                    .max(50, "A senha precisa ter no máximo 100 caracteres."),
            });

            await schema.validate(data);
            const userToken = await authUserUseCase.execute(data);

            return response.status(201).json(userToken);
        } catch (err) {
            if (err instanceof Error) {
                return response.status(401).json({ error: err.message });
            }
            return response.status(400).json({ error: err });
        }
    }
}

export { AuthUserController };
