import { Response, Request } from 'express';
import MatchController from '../controllers/match.controller';
import { Match } from '../models/match';
import { createRandomStageForTournament, createRandomTournament, generateMatchesData, generateSingleMatch } from './utils/generate';
import { MatchRepository } from '../repositories/match.repository';
import { MockRequest, MockResponse, createResponse, createRequest } from 'node-mocks-http';

afterEach(() => {
    jest.clearAllMocks();
});

describe('MatchController', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    describe('getMatches', () => {
        test('should return a list of matches', async () => {
            const tournament = createRandomTournament();
            const stage = createRandomStageForTournament(tournament.Id.toString());
            const matchesData: Match[] = generateMatchesData(tournament.Id, stage.Id, 3);
            const spy = jest.spyOn(MatchRepository.prototype, 'getMatches').mockResolvedValue(matchesData);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/match',
            });
            const matches = await MatchController.getMatches(req, res);
            expect(matches).toEqual(matchesData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return an empty list of matches', async () => {
            const spy = jest.spyOn(MatchRepository.prototype, 'getMatches').mockResolvedValue([]);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/match',
            });
            const matches = await MatchController.getMatches(req, res);
            expect(matches).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return a match', async () => {
            const tournament = createRandomTournament();
            const stage = createRandomStageForTournament(tournament.Id.toString());
            const matchesData: Match[] = generateMatchesData(tournament.Id, stage.Id, 1);
            const spy = jest.spyOn(MatchRepository.prototype, 'getMatchById').mockResolvedValue(matchesData[0]);
            const matchId = matchesData[0].Id;
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/match/' + matchId,
                params: {
                    matchCode: matchId,
                },
            });
            const match = await MatchController.getMatchById(req, res);
            expect(match).toEqual(matchesData[0]);
            expect(spy).toHaveBeenCalledTimes(1);
        }
        );

        test('should get a match list by tournament code', async () => {
            const tournament = createRandomTournament();
            const stage = createRandomStageForTournament(tournament.Id.toString());
            const matchesData: Match[] = generateMatchesData(tournament.Id, stage.Id, 3);
            const spy = jest.spyOn(MatchRepository.prototype, 'getMatchesByTournamentCode').mockResolvedValue(matchesData);
            const tournamentCode = matchesData[0].Tournament_ID;
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/match/tournament/' + tournamentCode,
                params: {
                    tournamentCode: tournamentCode,
                },
            });
            const matches = await MatchController.getMatchesByTournamentCode(req, res);
            expect(matches).toEqual(matchesData);
            expect(spy).toHaveBeenCalledTimes(1);

        });

        test('should get a match list by stage id', async () => {
            const tournament = createRandomTournament();
            const stage = createRandomStageForTournament(tournament.Id.toString());
            const matchesData: Match[] = generateMatchesData(tournament.Id, stage.Id, 3);
            const spy = jest.spyOn(MatchRepository.prototype, 'getMatchesByStageId').mockResolvedValue(matchesData);
            const stageId = matchesData[0].Stage_ID;
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/match/stage/' + stageId,
                params: {
                    stageId: stageId,
                },
            });
            const matches = await MatchController.getMatchesByStageId(req, res);
            expect(matches).toEqual(matchesData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return status 200', async () => {
            const tournament = createRandomTournament();
            const stage = createRandomStageForTournament(tournament.Id.toString());
            const matchesData: Match[] = generateMatchesData(tournament.Id, stage.Id, 1);
            const spy = jest.spyOn(MatchRepository.prototype, 'createMatch').mockResolvedValueOnce(matchesData[0].Id);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/match',
                body: matchesData[0],
            });
            await MatchController.createMatch(req, res);
            expect(res.statusCode).toBe(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        //TODO: Integration test for add team to math?
    });
});