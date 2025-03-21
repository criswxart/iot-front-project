export interface User {
    name: string;
    userEnabled: string;
    role: 'admin' | 'user';
    token: string;
}