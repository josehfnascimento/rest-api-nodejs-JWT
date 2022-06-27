import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createProductUseCase = container.resolve(CreateProductUseCase);
        try {
            const id_user = request.userId;
            const { name, description, price } = request.body;
            const data = { name, description, price, id_user };
            const schema = Yup.object({
                name: Yup.string()
                    .required("O nome é obrigatório.")
                    .min(3, "O nome precisa ter no mínimo 3 caracteres.")
                    .max(80, "O nome precisa ter no máximo 80 caracteres."),
                description: Yup.string()
                    .required("A descrição é obrigatória.")
                    .min(10, "A descrição precisa ter no mínimo 10 caracteres.")
                    .max(100, "A descrição precisa ter no máximo 100 caracteres."),
                price: Yup.string().required("O preço é obrigatório!"),
            });

            await schema.validate(data);
            const createdProduct = await createProductUseCase.execute(data);

            return response.status(201).json(createdProduct);
        } catch (err) {
            if (err instanceof Error) {
                return response.status(409).json({ error: err.message });
            }
            return response.status(500).json({ error: err });
        }
    }
}

export { CreateProductController };
