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
    ): Promise<IResult> {
        const listProduct = await this.productRepository.findOne({id_product: id_product});
        const listImages = await this.productImageRepository.find({id_product: id_product});

        if (!listProduct) throw new Error("Produto não encontrado!");

        return { product: listProduct, images: listImages};
    }
}

export { ListProductUseCase };
