import { ActionExpression, NotionExpression, LELProject, Synonym, Category, User } from './';

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