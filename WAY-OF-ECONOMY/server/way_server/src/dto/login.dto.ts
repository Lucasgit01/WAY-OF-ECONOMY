import { IsEmail, Matches } from "class-validator";

export class LoginDto {
    @IsEmail(undefined, { message: "E-mail deve estar no formato padrão, ex: nome@dominio.com" })
    email: string;

    @Matches(
        /^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).{6,}$/,
        { message: "A senha deve conter 6 dígitos com pelo menos um caracter e um número." }
    )
    password: string;
}