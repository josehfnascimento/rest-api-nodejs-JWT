import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/index"
import Product from "../../../../models/Products";
import {
    IProductRepository, IProductRepositoryDTO,
} from "../IProductRepository";

class ProductRepository implements IProductRepository {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async findOne(
        where: { [key: string]: string | number },
    ): Promise<Product | null> {
        const product = await this.productRepository.findOne({
            where,
        });

        return product;
    }

    async create(product: IProductRepositoryDTO): Promise<Product> {

        const createdProduct = this.productRepository.create({
            name: product.name,
            description: product.description,
            price: product.price,
            id_user: product.id_user,
        });
        
        await this.productRepository.save(createdProduct);

        return createdProduct;
    }

    async delete(id_product: string): Promise<void> {
        await this.productRepository.delete(id_product);
    }
}

export { ProductRepository };
