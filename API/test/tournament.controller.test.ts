import TournamentController from '../controllers/tournament.controller';
import { TournamentRepository } from '../repositories/tournament.repository';
import { generateTeamsData, generateTournamentsData } from './utils/generate';
import { Request, Response } from 'express';
import {
    createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';
import TeamController from '../controllers/team.controller';

afterEach(() => {
    jest.resetAllMocks();
});

describe('TournamentController', () => {
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;
    describe('getTournaments', () => {
        test('should return empty array', async () => {
            const spy = jest
                .spyOn(TournamentRepository.prototype, 'getTournaments')
                .mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/tournament',
            });
            const tournaments = await TournamentController.getTournaments(request, response);
            expect(tournaments).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return tournament list', async () => {
            const tournamentsData = generateTournamentsData(2);
            const spy = jest
                .spyOn(TournamentRepository.prototype, 'getTournaments')
                .mockResolvedValueOnce(tournamentsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/tournament',
            });
            const tournaments = await TournamentController.getTournaments(request, response);
            expect(tournaments).toEqual(tournamentsData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('getTournamentByCode', () => {
        test('should return tournament', async () => {
            const tournamentData = generateTournamentsData(1);
            const spy = jest
                .spyOn(TournamentRepository.prototype, 'getTournamentByCode')
                .mockResolvedValueOnce(tournamentData[0]);
            const tournamentCode = tournamentData[0].CodeTournament;
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/tournament/' + tournamentCode,
                params: {
                    code: tournamentCode,
                },
            });
            const tournament = await TournamentController.getTournamentByCode(request, response);
            expect(tournament).toEqual(tournamentData[0]);
            expect(spy).toHaveBeenCalledWith({});
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('createTournament', () => {
        test('should return status 200', async () => {
            const tournamentData = generateTournamentsData(1);
            const spy = jest
                .spyOn(TournamentRepository.prototype, 'createTournament')
                .mockResolvedValueOnce(tournamentData[0].CodeTournament);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/tournament',
                body: tournamentData[0],
            });
            const tournament = await TournamentController.createTournament(request, response);
            expect(tournament).toEqual(tournamentData[0].CodeTournament);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    //TODO: integration test?
    // describe('add team to a tournament', () => {
    //     test('should return status 200', async () => {
    //         const tournamentData = generateTournamentsData(1);
    //         const teamData = generateTeamsData(1);
    //         const spy = jest
    //             .spyOn(TournamentRepository.prototype, 'addTeamToTournament')
    //         const body = {
    //             Id_Team: teamData[0].Id,
    //             TournamentCode: tournamentData[0].CodeTournament
    //         };
    //         response = createResponse();
    //         request = createRequest({
    //             method: 'POST',
    //             url: 'api/v1/tournament/compete',
    //             body: body,
    //         });
    //         const result = await TournamentController.addTeamToTournament(request, response);
    //         expect(result).toEqual(1);
    //         expect(spy).toHaveBeenCalledTimes(1);
    //     });
    // });


});
