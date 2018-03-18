import { User, Symbol } from './index';
import { OnInit } from '@angular/core';

export class Notion {
    id: number;
    symbolId: number;
    symbol: Symbol;

    authorId: number;
    author: User;
    expression: string;
}
