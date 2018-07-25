import { LELProject } from "./lel-projects";
import { User } from "./user";

export class LelProjectTeam {
    id: number;
    lelProjectId: number;
    lelProject: LELProject;
    userId: number;
    user: User;
    isAdmin: boolean;

}