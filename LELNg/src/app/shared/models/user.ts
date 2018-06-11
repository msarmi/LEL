import { Role } from './index';

export class User {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    alias: string;
    role: Role;
    comments: Comment[];
}
