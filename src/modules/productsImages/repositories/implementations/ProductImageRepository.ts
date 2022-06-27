import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/index"
import ProductsImages from "../../../../models/ProductsImages";
import AWSService from "../../../../services/AWSService";
import {
    IProductImageRepository, IProductImageRepositoryDTO,
} from "../IProductImageRepository";

class ProductImageRepository implements IProductImageRepository {
    private productImageRepository: Repository<ProductsImages>;

    constructor() {
        this.productImageRepository = AppDataSource.getRepository(ProductsImages);
    }

    async find(
        where: { [key: string]: string | number },
    ): Promise<ProductsImages[]> {
        const productImage = await this.productImageRepository.find({
            where,
        });

        return productImage;
    }


    async findOne(
        where: { [key: string]: string | number },
    ): Promise<ProductsImages | null> {
        const productImage = await this.productImageRepository.findOne({
            where,
        });

        return productImage;
    }

    async create(productImage: IProductImageRepositoryDTO): Promise<ProductsImages> {
        const createdproductImage = this.productImageRepository.create({
            dsc_image: productImage.dsc_image,
            dsc_path: productImage.dsc_path,
            id_product: productImage.id_product,
        });
        
        await this.productImageRepository.save(createdproductImage);

        return createdproductImage;
    }

    async delete(id_product: string): Promise<void> {
        const awsService = new AWSService();

        const imagens = await this.productImageRepository.find({
            where: { id_product },
        });
        imagens.forEach(async (image) => {
            await awsService.deleteFile(image.dsc_path);
        });

        await this.productImageRepository.delete({ id_product });
    }
}

export { ProductImageRepository };
