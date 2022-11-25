import { Result } from "../../models/result";

export interface IResultRepository {
    getResults(): Promise<Result[]>;
    postResult(Home_Score: number, Visit_Score: number,
        Best_player: number, Id_match: number,
        Id_Winner: number, Tournament_code: string, ResultList: {
            Player_Id: string, Goals: string, Assists: string
        }[]): Promise<number>;
    getResultByMatch(id: number): Promise<Result>;
    getLeaderboardByTournament(Tournament_code: string): Promise<{
        NickName: string, Point: number
    }[]>;
    getLeaderboardByGroup(Tournament_code: string, Group_name: string): Promise<{
        NickName: string, Point: number
    }[]>;
}