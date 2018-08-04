import { Symbol, User } from './index';

export class SymbolComment {
    id: number;
    symbolId: number;
    symbol: Symbol;

    authorId: number;
    author: User;
    content: string;
}