import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ProductsCreateTable1656259234902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id_product",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "name",
                    type: "varchar",                    
                },
                {
                    name: "description",
                    type: "varchar",  
                },
                {
                    name: "price",
                    type: "decimal",                    
                }, 
                {
                    name: "id_user",
                    type: "uuid",                    
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
        await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
    }

}
