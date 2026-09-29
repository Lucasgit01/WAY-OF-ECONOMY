import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "../services/auth.service.js";
import { LoginDto } from "../dto/login.dto.js";
import { type Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("login")
    public async authenticateRoute(
        @Body() { email, password }: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const auth = await this.authService.authenticate(email, password);
        res.cookie("authPayload", auth, {
            httpOnly: true,
            maxAge: 36000,
            sameSite: "strict",
            secure: true
        });

        const { token: _, ...payloadReturn } = auth
        res.status(200).json({
            message: `É um prazer te-lô conosco, ${auth.name} - ${auth.role}!`,
            body: payloadReturn
        });
    }
}