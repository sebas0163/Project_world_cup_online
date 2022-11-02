import { Team } from "../../models/team";

export interface ITeamRepository {
    getTeams(): Promise<Team[]>;
}