import { Result } from "../../models/result";

export interface IResultRepository {
    getResults(): Promise<Result[]>;
    postResult(Home_Score: number, Visit_Score: number,
        Best_player: number, Id_match: number,
        Id_Winner: number, ResultList: {
            Player_Id: string, Goals: string, Assists: string
        }[]): Promise<number>;
    getResultByMatch(id: number): Promise<Result>;
}