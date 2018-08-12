import { Symbol, User } from './index';

export class SymbolComment {

    id: number;

    symbolId: number;

    symbol: Symbol;

    userId: number;

    user: User;

    content: string;

    symbolCommentId: number;
    
    symbolCommentReply: SymbolComment;
}