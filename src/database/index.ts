import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "tsauth",
    password: "1234",
    synchronize: false,
    entities: [
       "./src/models/*.ts"
    ],
    migrations: [
        "./src/database/migrations/*.ts"
    ],
})

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Successfully connected with database!")
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization", err)
    })