export interface User {
    name: string;
    userEnabled: string;
    role: 'ROLE_administrador' | 'ROLE_operario';
    token: string;
}