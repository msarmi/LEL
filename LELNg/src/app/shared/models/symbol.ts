import { BehaviouralResponse, Notion, LELProject, Synonym, Category, User } from './index';
import { SymbolComment } from './symbol-comment';
import { SymbolLike } from './symbol-like';

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
    comments: SymbolComment[];
    symbolLikes: SymbolLike[];
    likes: number;
    dislikes: number;

    constructor() {
        this.synonyms = [];
        this.notions = [];
        this.behaviouralResponses = [];
        this.comments = [];
        this.symbolLikes = [];
    }
}
