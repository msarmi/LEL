import { Symbol, User } from './index';

export class BehaviouralResponse {
    id: number;
    symbolId: number;
    symbol: Symbol;

    authorId: number;
    author: User;
    content: string;
    expression: string;
}
