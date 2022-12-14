import { StageRepository } from '../repositories/stage.repository';
import { IStageRepository } from '../repositories/interfaces/stage.interface';
import { validateBody } from '../utils';

const stageRepository: IStageRepository = new StageRepository();

class StageController {


    /**
     * Get all stages from the database and return them as a JSON object.
     * @param {any} req - any - the request object
     * @param {any} res - any - the response object
     */
    static async getStages(req: any, res: any) {
        try {
            const stages = await stageRepository.getStages();
            res.status(200).json(stages);
            return stages;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes an id an returns the stage associated with that id.
     * @param req - The request object
     * @param res - the response object
     * @returns An stage.
     */
    static async getStageById(req: any, res: any) {
        try {
            let id = req.params.id || {}
            const stage = await stageRepository.getStageById(+id);
            if (stage == null) {
                res.status(404).json({ message: "Stage not found" });
            }
            res.status(200).json(stage);
            return stage;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a tournament id, and returns all the stages associated with that tournament.
     * @param req - request
     * @param res - the response object
     * @returns An array of objects(stages).
     */
    static async getStagesByTournamentCode(req: any, res: any) {
        try {
            let code = req.params.id || {}
            const stages = await stageRepository.getStagesByTournamentCode(code);
            res.status(200).json(stages);
            return stages;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It creates a stage in the database.
     * @param {any} req - any, res: any
     * @param {any} res - any -&gt; the response object
     */
    static async createStage(req: any, res: any) {
        try {
            const { Name, Tournament_ID } = req.body;
            if (!validateBody(req.body, ['Name', 'Tournament_ID'])) {
                res.status(400).json({ message: "Bad Request, Please fill all the fields" });
            } else {
                const result = await stageRepository.createStage(Name, Tournament_ID);
                if (result == 1) {
                    res.status(200).json("Stage " + Name + " created");
                }
            }
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

}

export default StageController;