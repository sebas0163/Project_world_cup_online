import { Team } from "../../models/team";

export interface ITeamRepository {
    getTeams(): Promise<Team[]>;
    getTeamsByTournamentCode(id: string): Promise<Team[]>;
    createTeam(Name: string, Type: string): Promise<number>;
    getTeamsByType(type: string): Promise<Team[]>;
    getTeamById(id: number): Promise<Team>;
}