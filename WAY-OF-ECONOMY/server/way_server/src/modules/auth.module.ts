import { Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Logons } from "../entities/logons.entity.js";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([Logons]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: '05Hrs' }
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    // exports: [AuthService]
})
export class AuthModule { }