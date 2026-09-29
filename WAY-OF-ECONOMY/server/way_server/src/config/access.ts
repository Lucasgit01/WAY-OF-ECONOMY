import { Roles } from "../@types/roles.js";

//control - Sem restrições
export const access: Record<Roles, string[]> = {
    director: [
        "sales",
        "service",
        "partners:read",
        "ads:read",
        "products:control",
        "cash:control",
        "user:control",
    ],
    manager: [
        "sales",
        "service",
        "partners:control",
        "ads:control",
        "products:control",
        "cash:read",
        "user:control",
    ],
    "performance manager": [
        "sales",
        "partners:read",
        "products:read",
    ],
    finance: [
        "sales:read",
        "partners:read",
        "ads:read",
        "cash:control"
    ],
    "inventory analyst": [
        "sales:read",
        "products:control"
    ]
};