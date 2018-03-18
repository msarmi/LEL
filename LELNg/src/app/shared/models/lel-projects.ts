import { LELProjectAdmin } from './index';
import { User } from './index';

export class LELProject {
    id: number;
    name: string;
    authorId: number;
    author: User;
    admins: LELProjectAdmin[];
    symbols: Symbol[];
}