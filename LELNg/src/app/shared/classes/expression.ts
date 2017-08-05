import { User } from './user';
import { ActionExpression } from './action-expression';
import { NotionExpression } from './notion-expression';
import { ExpressionSymbol } from './expression-symbol';

export class Expression {
    Id: number;
    Content: string;
    ContentSymbols: ExpressionSymbol[];
    NotionSymbols: NotionExpression[];
    ActionSymbols: ActionExpression[];

    AuthorId: number;
    Author: User;
}