import { inject, injectable } from "tsyringe";

import Products from "../../../../models/Products";
import { IProductImageRepository } from "../../../productsImages/repositories/IProductImageRepository";
import {
    IProductRepository,
    IProductRepositoryDTO,
    IResult
} from "../../repositories/IProductRepository";

@injectable()
class ListProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
        @inject("ProductImageRepository")
        private productImageRepository: IProductImageRepository,
    ) {}
    async execute(
        id_product: string,
    ): Promise<void> {
        const findProduct = await this.productRepository.findOne({id_product: id_product});

        if (!findProduct) throw new Error("Produto não encontrado!");

        await this.productRepository.delete(id_product);
        await this.productImageRepository.delete(id_product);
    }
}

export { ListProductUseCase };
