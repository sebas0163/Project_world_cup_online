import { Stage } from "../../models/stage";

export interface IStageRepository {
    getStages(): Promise<Stage[]>;
    getStageById(id: number): Promise<Stage>;
    getStagesByTournamentCode(code: string): Promise<Stage[]>;
    createStage(Name: string, Tournament_ID: string): Promise<number>;
}