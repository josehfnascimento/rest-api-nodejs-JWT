import { container } from "tsyringe";

import { ProductRepository } from "../../modules/products/repositories/implementations/ProductRepository";
import { ProductImageRepository } from "../../modules/productsImages/repositories/implementations/ProductImageRepository";
import { IProductRepository } from "../../modules/products/repositories/IProductRepository";
import { IProductImageRepository } from "../../modules/productsImages/repositories/IProductImageRepository";
import { UserRepository }  from "../../modules/users/repositories/implementations/UserRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository,
);

container.registerSingleton<IProductRepository>(
    "ProductRepository",
    ProductRepository,
);

container.registerSingleton<IProductImageRepository>(
    "ProductImageRepository",
    ProductImageRepository,
);
