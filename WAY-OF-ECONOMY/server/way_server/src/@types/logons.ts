export interface LogonType {
    name: string,
    email: string,
    password: string,
    code: string,
    role: string,
    permissions: string[],
    avatar: string | null
};