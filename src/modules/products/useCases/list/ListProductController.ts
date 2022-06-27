import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductUseCase } from "./ListProductUseCase";

class ListProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listProductUseCase = container.resolve(ListProductUseCase);
        try {
            const id_product = request.params.id_product;

            const products = await listProductUseCase.execute(id_product);

            return response.status(200).json(products);
        } catch (err) {
            if (err instanceof Error) {
                return response.status(404).json({ error: err.message });
            }

            return response.status(400).json({ error: err });
        }
    }
}

export { ListProductController };
