import { inject, injectable } from "tsyringe";

import ProductImages from "../../../../models/ProductsImages";
import AWSService from "../../../../services/AWSService";
import { IProductImageRepository, IProductImageRepositoryDTO } from "../../repositories/IProductImageRepository";

@injectable()
class CreateProductImageUseCase {
    constructor(
        @inject("ProductImageRepository")
        private productImageRepository: IProductImageRepository,
    ) {}
    async execute(productImage: IProductImageRepositoryDTO): Promise<ProductImages> { 
        const images = await this.productImageRepository.find({
            id_product: productImage.id_product
        });
        
        if(images.length >= 5) throw new Error("Produto já chegou ao limite de 5 imagens!");
          
        const awsService = new AWSService();
        const resp = await awsService.uploadFile({
            filePath: productImage.dsc_path!,
            fileName: `products_images/${productImage.id_user}/${productImage.id_product}/${productImage.dsc_image}`,
        });

        productImage.dsc_path = resp;

        const createdProductImage = await this.productImageRepository.create(productImage);
        
        return createdProductImage;
    }
}

export { CreateProductImageUseCase };
