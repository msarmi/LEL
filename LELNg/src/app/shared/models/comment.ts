import { User } from './index';

export class Comment {
    id: number;
    content: string;
    authorId: number;
    author: User;
}