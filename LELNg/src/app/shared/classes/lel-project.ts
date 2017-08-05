import { LELProjectAdmin } from './lel-project-admin';
import { User } from './user';

export class LELProject {
    Id: number;
    Name: string;
    AuthorId: number;
    Author: User;
    Admins: LELProjectAdmin[];
    Symbols: Symbol[];
}