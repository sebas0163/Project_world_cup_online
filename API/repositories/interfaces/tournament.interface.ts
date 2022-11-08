import { Tournament } from "../../models/tournament";

export interface ITournamentRepository {
    getTournaments(): Promise<Tournament[]>;
    getTournamentByCode(code: string): Promise<Tournament>;
    createTournament(Name: string, StartDate: string, EndDate: string,
        Rules: string, Type: string): Promise<number>;
    addTeamToTournament(Id_Team: number, TournamentCode: string): Promise<number>;
    addFullTournament(Name: string, StartDate: string, EndDate: string,
        Rules: string, Type: string, StageList: string[],
        TeamList: string[]): Promise<number>;

}