import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Products from "./Products";

@Entity("products_images")
class ProductImages {    
    @PrimaryGeneratedColumn("uuid")
    id_product_image: string;

    @Column()
    dsc_image: string;

    @Column()
    dsc_path: string;

    @Column()
    id_product: string;

    @ManyToOne(() => Products)
    @JoinColumn({ name: "id_product" })
    product: Products;
}

export default ProductImages;
