import { Match } from "../../models/match";

export interface IMatchRepository {
    getMatches(): Promise<Match[]>;
    getMatchById(id: number): Promise<Match>;
    getMatchesByTournamentCode(code: string): Promise<Match[]>;
    createMatch(Stadium: string, StartDateTime: string, State: string,
        Score: string, Tournament_ID: String, Stage_ID: number,
        HomeId: number, VisitId: number): Promise<number>;
    getMatchesByStageId(id: number): Promise<Match[]>;
    addTeamToMatch(Id_Team: number, Id_Match: number): Promise<number>;
}