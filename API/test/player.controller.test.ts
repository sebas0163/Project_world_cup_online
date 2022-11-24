import PlayerController from '../controllers/player.controller';
import { createRandomTeam, generatePlayersData, generateTeamWithPlayers } from '../test/utils/generate';
import { Player } from '../models/player';
import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse, } from 'node-mocks-http';
import { PlayerRepository } from '../repositories/player.repository';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Player Controller', () => {
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;
    describe('getPlayers', () => {
        test('should return a list of players', async () => {
            const players: Player[] = generatePlayersData(5);
            const spy = jest.spyOn(PlayerRepository.prototype, 'getPlayers').mockResolvedValueOnce(players);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/player'
            });
            const playersList = await PlayerController.getPlayers(request, response);
            expect(playersList).toEqual(players);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty list', async () => {
            const spy = jest.spyOn(PlayerRepository.prototype, 'getPlayers').mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/player'
            });
            const playersList = await PlayerController.getPlayers(request, response);
            expect(playersList).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getPlayersByTeam', () => {
        test('should return a list of players by team', async () => {
            const team = createRandomTeam();
            const teamPlayerList = generateTeamWithPlayers(team);
            const spy = jest.spyOn(PlayerRepository.prototype, 'getPlayersByTeam').mockResolvedValueOnce(teamPlayerList);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/player/team/' + team.Id
            });
            const playersList = await PlayerController.getPlayersByTeam(request, response);
            expect(playersList).toEqual(teamPlayerList);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty list', async () => {
            const team = createRandomTeam();
            const spy = jest.spyOn(PlayerRepository.prototype, 'getPlayersByTeam').mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/player/team/' + team.Id
            });
            const playersList = await PlayerController.getPlayersByTeam(request, response);
            expect(playersList).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

});