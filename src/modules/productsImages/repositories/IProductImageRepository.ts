import ProductsImages from "../../../models/ProductsImages";

interface IProductImageRepositoryDTO {
    id_product_image?: string;
    dsc_image?: string;
    dsc_path?: string;
    id_product: string;
    id_user?: string;
}

interface IProductImageRepository {
    find(
        where: { [key: string]: string | number },
    ): Promise<ProductsImages[]>;
    findOne(
        where: { [key: string]: string | number },
    ): Promise<ProductsImages | null>;
    create(productImage: IProductImageRepositoryDTO): Promise<ProductsImages>;
    delete(id_product: string): Promise<void>;
}

export {
    IProductImageRepository,
    IProductImageRepositoryDTO,
};