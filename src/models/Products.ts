import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import ProductImages from "./ProductsImages";

@Entity("products")
class Products {    
    @PrimaryGeneratedColumn("uuid")
    id_product: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    id_user: string;

    @OneToMany(() => ProductImages, (productImages) => productImages.product)
    @JoinColumn({ name: "id_product_image" })
    productImages: Products[];
}

export default Products;
