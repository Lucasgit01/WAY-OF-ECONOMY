import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Logons } from "../entities/logons.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { PayloadAuth } from "../@types/payload.js";
import { access } from "../config/access.js";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Logons)
        private userRepository: Repository<Logons>,
        private jwtService: JwtService
    ) { }

    public async authenticate(email: string, logonPassword: string): Promise<PayloadAuth> {
        try {
            const logon = await this.userRepository.findOne({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    code: true,
                    role: true,
                    avatar: true
                }
            });

            if (!logon)
                throw new NotFoundException("O email informado não está cadastrado.");

            const { password, ...logonWithoutPass } = logon;
            const matchPass = await compare(logonPassword, password);

            if (!matchPass)
                throw new UnauthorizedException("As senhas não conferem!");

            const token = await this.jwtService.signAsync(logonWithoutPass);
            const permissions = access[logon.role];

            return { ...logonWithoutPass, token, permissions };

        } catch (error) {
            throw error;
        }
    };
}