import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ProductsImagesCreateTable1656259633210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new Table({
            name: "product_images",
            columns: [
                {
                    name: "id_product_image",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "dsc_image",
                    type: "varchar",                    
                },
                {
                    name: "dsc_path",
                    type: "varchar",  
                },
                {
                    name: "id_product",
                    type: "uuid",                    
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product_images");
        await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
    }

}
