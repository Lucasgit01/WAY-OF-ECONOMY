import { Check, Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn } from "typeorm";
import { type Roles } from "../@types/roles.js";
import { IsEmail, Matches } from "class-validator";

const rolesArray: Roles[] = ["director", "manager", "performance manager", "finance", "inventory analyst"];

@Entity()
@Check(
    `"email" ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'`
)
export class Logons {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({
        type: 'varchar',
        enum: rolesArray,
        nullable: false
    })
    role: Roles;

    @IsEmail(undefined, { message: "E-mail deve estar no formato padrão, ex: nome@dominio.com" })
    @Column({ type: 'varchar', length: 70, nullable: false, unique: true })
    email: string;

    @Matches(
        /^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).{6,}$/,
        { message: "A senha deve conter 6 dígitos com pelo menos um caracter e um número." }
    )
    @Column({ type: 'varchar', length: 60, nullable: false })
    password: string;

    @Column({ type: "int", nullable: false, unique: true })
    @Generated("rowid")
    code: number;

    @Column({ type: "varchar", length: 2048, nullable: true })
    avatar: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;
}