import { Role } from './index';

export class User {
    id: number;
    name: string;
    lastName: string;
    userName: string;
    email: string;
    alias: string;
    role: Role;
    comments: Comment[];
}
