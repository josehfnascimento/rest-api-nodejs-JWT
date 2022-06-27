import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase);
        try {
            const { name, email, password } = request.body;
            const data = { name, email, password };
            const schema = Yup.object({
                name: Yup.string()
                    .required("O nome é obrigatório.")
                    .min(3, "O nome precisa ter no mínimo 3 caracteres.")
                    .max(100, "O nome precisa ter no máximo 100 caracteres."),
                email: Yup.string().required("O email é obrigatório!")
                    .email("Preencha um email válido!"),
                password: Yup.string().required("A senha é obrigatória!")
                    .min(6, "A senha precisa ter no mínimo 6 caracteres.")
                    .max(50, "A senha precisa ter no máximo 50 caracteres."),
            });

            await schema.validate(data);
            const createdUser = await createUserUseCase.execute(data);

            return response.status(201).json(createdUser);
        } catch (err) {
            if (err instanceof Error) {
                return response.status(409).json({ error: err.message });
            }
            return response.status(400).json({ error: err });
        }
    }
}

export { CreateUserController };
