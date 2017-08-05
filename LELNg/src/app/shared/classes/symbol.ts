import { ActionExpression } from './action-expression'; 
import { NotionExpression } from './notion-expression';
import { Synonym } from './synonym';
import { LELProject } from './lel-project';
import { Category } from './category';
import { User } from './user';

export class Symbol {
    Id: number;
    Name: string;
    AuthorId: number;
    Author: User;
    Category: Category;
    LELProjectId: number;
    LELProject: LELProject;
    Synonyms: Synonym[];
    Notions: NotionExpression[];
    Actions: ActionExpression[];
}