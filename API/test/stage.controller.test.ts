import StageController from '../controllers/stage.controller';
import { StageRepository } from '../repositories/stage.repository';
import { Stage } from '../models/stage';
import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { generateStagesData, generateStagesForTournament, generateTournamentsData } from './utils/generate';

afterEach(() => {
    jest.clearAllMocks();
});

describe('StageController', () => {
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;

    describe('getStages', () => {
        test('should return empty array', async () => {
            const spy = jest.spyOn(StageRepository.prototype, 'getStages').mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/stage',
            });
            const stages = await StageController.getStages(request, response);
            expect(stages).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return stage list', async () => {
            const stagesData = generateStagesData(2);
            const spy = jest.spyOn(StageRepository.prototype, 'getStages').mockResolvedValueOnce(stagesData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/stage',
            });
            const stages = await StageController.getStages(request, response);
            expect(stages).toEqual(stagesData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getStageById', () => {

        test('should return stage', async () => {
            const stagesData = generateStagesData(1);
            const spy = jest.spyOn(StageRepository.prototype, 'getStageById').mockResolvedValueOnce(stagesData[0]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/stage/' + stagesData[0].Id,
            });
            const stage = await StageController.getStageById(request, response);
            expect(stage).toEqual(stagesData[0]);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 404', async () => {
            const tournament = generateTournamentsData(1)[0];
            const missingStage = generateStagesForTournament(1, tournament.CodeTournament)[0];
            const spy = jest.spyOn(StageRepository.prototype, 'getStageById')
                .mockRejectedValueOnce(missingStage);

            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/stage/' + missingStage.Id,
            });
            try {
                await StageController.getStageById(request, response);
            } catch (error) {
                console.log(error);
                expect(response.statusCode).toEqual(404);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });

    });

    describe('getStagesByTournamentCode', () => {

        test('should return stage list', async () => {
            const tournament = generateTournamentsData(1)[0];
            const stagesData = generateStagesForTournament(2, tournament.CodeTournament);
            const spy = jest.spyOn(StageRepository.prototype, 'getStagesByTournamentCode').mockResolvedValueOnce(stagesData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/stage/tournament/' + stagesData[0].Tournament_ID,
            });
            const stages = await StageController.getStagesByTournamentCode(request, response);
            expect(stages).toEqual(stagesData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty list', async () => {
            const tournament = generateTournamentsData(1)[0];
            const stagesData = generateStagesForTournament(2, tournament.CodeTournament);
            const spy = jest.spyOn(StageRepository.prototype, 'getStagesByTournamentCode').mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/stage/tournament/' + stagesData[0].Tournament_ID,
            });
            const stages = await StageController.getStagesByTournamentCode(request, response);
            expect(stages).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);
        });

    });

    describe('createStage', () => {

        test('should create stage', async () => {
            const tournament = generateTournamentsData(1)[0];
            const stageData = generateStagesForTournament(1, tournament.CodeTournament)[0];
            const spy = jest.spyOn(StageRepository.prototype, 'createStage').mockResolvedValueOnce(1);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/stage',
                body: stageData,
            });
            await StageController.createStage(request, response);
            expect(response.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 400', async () => {
            const tournament = generateTournamentsData(1)[0];
            const stageData = generateStagesForTournament(1, tournament.CodeTournament)[0];
            const spy = jest.spyOn(StageRepository.prototype, 'createStage').mockRejectedValueOnce(stageData);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/stage',
                body: stageData,
            });
            try {
                await StageController.createStage(request, response);
            } catch (error) {
                expect(response.statusCode).toEqual(400);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });

    });

});
