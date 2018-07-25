import { LELProjectAdmin } from './index';
import { User } from './index';
import { LelProjectTeam } from './lel-project-team';

export class LELProject {
    id: number;
    name: string;
    authorId: number;
    author: User;
    team: LelProjectTeam[];
    symbols: Symbol[];

    constructor() {
        this.team= [];
        this.symbols = [];
    }
}