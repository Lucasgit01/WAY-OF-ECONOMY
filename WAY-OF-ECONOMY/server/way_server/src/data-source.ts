import { DataSource } from "typeorm";
import "dotenv/config"

const folderPath = (relativeDir: string) => `${import.meta.dirname}/${relativeDir}/**/*{.js,.ts}`;

export const globalDataSource = new DataSource({
    type: "postgres",
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [folderPath("entities")],
    migrations: [folderPath("migrations")],
    synchronize: false,
});