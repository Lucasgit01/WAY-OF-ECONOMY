import { ConfigService } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";

const folderPath = (relativeDir: string) => `${import.meta.dirname}/../${relativeDir}/**/*{.js,.ts}`;

export const dbKeys = (configService: ConfigService): DataSourceOptions => ({
    type: "postgres",
    port: configService.get("DB_PORT"),
    host: configService.get("DB_HOST"),
    username: configService.get("DB_USER"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    entities: [folderPath("entities")],
    migrations: [folderPath("migrations")],
    synchronize: false,
    logging: ["info", "error"]
});