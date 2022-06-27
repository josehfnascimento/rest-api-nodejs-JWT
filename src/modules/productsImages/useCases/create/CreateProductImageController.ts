import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { CreateProductImageUseCase } from "./CreateProductImageUseCase";

class CreateProductImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createProductImageUseCase = container.resolve(CreateProductImageUseCase);
        try {
            const { id_product } = request.body;
            const dsc_image = request.file!.filename;
            const dsc_path = request.file!.path;
            const id_user = request.userId;
            const data = { dsc_image, dsc_path, id_product, id_user};
            const schema = Yup.object({
                id_product: Yup.string().required("O id do produto é obrigatório!"),
            });

            await schema.validate(data);
            const createdProductImage = await createProductImageUseCase.execute(data);

            return response.status(201).json(createdProductImage);
        } catch (err) {
            if (err instanceof Error) {
                return response.status(409).json({ error: err.message });
            }
            return response.status(500).json({ error: err });
        }
    }
}

export { CreateProductImageController };
