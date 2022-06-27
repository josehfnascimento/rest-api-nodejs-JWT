import Products from "../../../models/Products";
import ProductsImages from "../../../models/ProductsImages"

interface IProductRepositoryDTO {
    id_product?: string;
    name: string;
    description: string;
    price: string;
    id_user: string;
}

interface IResult {
    product: Products | null;
    images: ProductsImages[] | null;
}

interface IProductRepository {
    findOne(
        where: { [key: string]: string | number },
    ): Promise<Products | null>;
    create(product: IProductRepositoryDTO): Promise<Products>;
    delete(id_product: string): Promise<void>;
}

export {
    IProductRepository,
    IProductRepositoryDTO,
    IResult
};