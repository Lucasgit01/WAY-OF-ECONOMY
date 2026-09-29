import { Logons } from "../entities/logons.entity.js";

export interface PayloadAuth extends Omit<Logons, "password" | "createdAt"> {
    token: string,
    permissions: string[]
};