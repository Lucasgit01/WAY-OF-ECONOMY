import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectDataSource, TypeOrmModule } from "@nestjs/typeorm";
import { dbKeys } from "../config/db.params.js";
import { DataSource } from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: dbKeys,
            dataSourceFactory: async (options) => {
                try {
                    if (!options || Object.keys(options).length == 0)
                        throw new Error("Empty connection options.");

                    const dataSrc = new DataSource(options);
                    return await dataSrc.initialize();
                } catch (error) {
                    throw error;
                };
            },
        })
    ]
})
export class DatabaseModule implements OnModuleInit {
    @InjectDataSource()
    private dataSource: DataSource;
    private logger = new Logger();

    onModuleInit() {
        if (this.dataSource.isInitialized)
            this.logger.log(
                `Success on connect in '${this.dataSource.options.database}' database ✅`,
                "DatabaseGateway"
            )
    };
};