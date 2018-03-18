import { Role } from './index';

export class User {
    Id: number;
    Name: string;
    Lastname: string;
    Alias: string;
    Role: Role;
    Comments: Comment[];
}