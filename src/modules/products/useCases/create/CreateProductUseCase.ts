import { inject, injectable } from "tsyringe";

import Products from "../../../../models/Products";
import {
    IProductRepository,
    IProductRepositoryDTO,
} from "../../repositories/IProductRepository";

@injectable()
class CreateProductUseCase {
    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) {}
    async execute(product: IProductRepositoryDTO): Promise<Products> { 
        const createdProduct = await this.productRepository.create(product);
        
        return createdProduct;
    }
}

export { CreateProductUseCase };
