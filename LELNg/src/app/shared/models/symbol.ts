import { BehaviouralResponse, Notion, LELProject, Synonym, Category, User } from './index';

export class Symbol {
    id: number;
    name: string;
    authorId: number;
    author: User;
    category: Category;
    lelProjectId: number;
    lelProject: LELProject;
    synonyms: Synonym[];
    notions: Notion[];
    behaviouralResponses: BehaviouralResponse[];

    constructor() {
        this.synonyms = [];
        this.notions = [];
        this.behaviouralResponses = [];
    }
}