import { User } from './user';

export class Comment {
    Id: number;
    Content: string;
    AuthorId: number;
    Author: User;
}