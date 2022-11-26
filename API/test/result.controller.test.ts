import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { ResultRepository } from '../repositories/result.repository';
import ResultController from '../controllers/result.controller';
import { Result } from '../models/result';
import { createRandomResults, createRandomTournament, generateGroupsData, generateLeadearboard, generateResultsData } from './utils/generate';
import { Tournament } from '../models/tournament';
import { Group } from '../models/group';

afterEach(() => {
    jest.clearAllMocks();
});

describe('ResultController', () => {

    let request: MockRequest<Request>;
    let response: MockResponse<Response>;

    describe('getResults', () => {
        test('should return empty array', async () => {
            const spy = jest.spyOn(ResultRepository.prototype, 'getResults').mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result',
            });
            const results = await ResultController.getResults(request, response);
            expect(results).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return result list', async () => {
            const resultsData: Result[] = createRandomResults(2);
            const spy = jest.spyOn(ResultRepository.prototype, 'getResults')
                .mockResolvedValueOnce(resultsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result',
            });
            const results = await ResultController.getResults(request, response);
            expect(results).toEqual(resultsData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getResultByMatch', () => {

        test('should return result', async () => {
            const resultsData = generateResultsData(1);
            const spy = jest.spyOn(ResultRepository.prototype, 'getResultByMatch').mockResolvedValueOnce(resultsData[0]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result/' + resultsData[0].Id_match,
            });
            const result = await ResultController.getResultByMatch(request, response);
            expect(result).toEqual(resultsData[0]);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 404', async () => {
            const missingResult = createRandomResults(1)[0];
            const spy = jest.spyOn(ResultRepository.prototype, 'getResultByMatch')
                .mockRejectedValueOnce(missingResult);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result/' + missingResult.Id_match,
            });
            try {
                await ResultController.getResultByMatch(request, response);
            } catch (error) {
                expect(response.statusCode).toEqual(404);
            }

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getLeaderboardByTournament', () => {
        test('should return leaderboard', async () => {
            const tournament: Tournament = createRandomTournament();
            const resultsData = generateLeadearboard(5);
            const spy = jest.spyOn(ResultRepository.prototype, 'getLeaderboardByTournament')
                .mockResolvedValueOnce(resultsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result/leaderboards/tournament/' + tournament.CodeTournament,
            });
            const result = await ResultController.getLeaderboardByTournament(request, response);
            expect(result).toEqual(resultsData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 404', async () => {
            const tournament: Tournament = createRandomTournament();
            const spy = jest.spyOn(ResultRepository.prototype, 'getLeaderboardByTournament')
                .mockRejectedValueOnce(tournament);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result/leaderboards/tournament/' + tournament.CodeTournament,
            });
            try {
                await ResultController.getLeaderboardByTournament(request, response);
            } catch (error) {
                expect(response.statusCode).toEqual(404);
            }

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getLeaderboardByGroup', () => {
        test('should return leaderboard', async () => {
            const group: Group = generateGroupsData(1)[0];
            const resultsData = generateLeadearboard(5);
            const spy = jest.spyOn(ResultRepository.prototype, 'getLeaderboardByGroup')
                .mockResolvedValueOnce(resultsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result/leaderboards/group/' + group.Code,
            });
            const result = await ResultController.getLeaderboardByGroup(request, response);
            expect(result).toEqual(resultsData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 404', async () => {
            const group: Group = generateGroupsData(1)[0];
            const spy = jest.spyOn(ResultRepository.prototype, 'getLeaderboardByGroup')
                .mockRejectedValueOnce(group);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/result/leaderboards/group/' + group.Code,
            });
            try {
                await ResultController.getLeaderboardByGroup(request, response);
            } catch (error) {
                expect(response.statusCode).toEqual(404);
            }

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('postResult', () => {
        test('should return result', async () => {
            const resultsData = generateResultsData(1);
            const spy = jest.spyOn(ResultRepository.prototype, 'postResult').mockResolvedValueOnce(resultsData[0].Id);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/result',
                body: resultsData[0],
            });
            await ResultController.postResult(request, response);
            expect(response.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 400', async () => {
            const resultsData = generateResultsData(1);
            const spy = jest.spyOn(ResultRepository.prototype, 'postResult')
                .mockRejectedValueOnce(resultsData[0]);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/result',
                body: { Id_match: resultsData[0].Id_match }
            });
            try {
                await ResultController.postResult(request, response);
            } catch (error) {
                expect(response.statusCode).toEqual(400);
            }

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

