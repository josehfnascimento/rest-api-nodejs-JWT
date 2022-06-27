import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/multer";
import { CreateProductController } from "../modules/products/useCases/create/CreateProductController";
import { ListProductController } from "../modules/products/useCases/list/ListProductController";
import { CreateProductImageController } from "../modules/productsImages/useCases/create/CreateProductImageController";
import { DeleteProductController } from "../modules/products/useCases/delete/DeleteProductController";

const productRouter = Router();
const upload = multer(multerConfig);

productRouter.get("/:id_product", (req, res) => {
        const listController = new ListProductController();
        return listController.handle(req, res);
});

productRouter.post("/", (req, res) => {
        const createProductController = new CreateProductController();
        return createProductController.handle(req, res);
});

productRouter.post("/images", upload.single("image"), (req, res) => {
        const createProductImageController = new CreateProductImageController();
        return createProductImageController.handle(req, res);
});

productRouter.delete("/:id_product", (req, res) => {
        const deleteProductController = new DeleteProductController();
        return deleteProductController.handle(req, res);
});

export default productRouter;
