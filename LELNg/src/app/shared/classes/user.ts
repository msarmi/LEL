import { Role } from './role';

export class User {
    Id: number;
    Name: string;
    Lastname: string;
    Alias: string;
    Role: Role;
    Comments: Comment[];
}