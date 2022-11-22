import TeamController from "../controllers/team.controller";
import { TeamRepository } from "../repositories/team.repository";
import { addTeamsToRandomTournament, createRandomTournament, generateTeamsData } from "./utils/generate";
import { Request, Response } from "express";
import {
    createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';
import { Team } from "../models/team";


afterEach(() => {
    jest.resetAllMocks();
});

describe("TeamController", () => {
    let request: MockRequest<Request>;
    let response: MockResponse<Response>;
    describe("getTeams", () => {
        test("should return empty array", async () => {
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeams")
                .mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team',
            });
            const users = await TeamController.getTeams(request, response);
            expect(users).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test("should return team list", async () => {
            const teamsData = generateTeamsData(2);
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeams")
                .mockResolvedValueOnce(teamsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team',
            });
            const users = await TeamController.getTeams(request, response);
            expect(users).toEqual(teamsData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe("getTeamById", () => {

        test("should return team", async () => {
            const teamsData = generateTeamsData(1);
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeamById")
                .mockResolvedValueOnce(teamsData[0]);
            const teamId = teamsData[0].Id;
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/' + teamId,
                params: {
                    teamId: teamId,
                },
            });
            const team = await TeamController.getTeamById(request, response);
            expect(team).toEqual(teamsData[0]);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test("should return 404", async () => {
            const missingTeam: Team = generateTeamsData(1)[0];
            const spy = jest.spyOn(TeamRepository.prototype, "getTeamById")
                .mockRejectedValueOnce(missingTeam);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/' + missingTeam.Id,
                params: {
                    teamId: missingTeam.Id,
                },
            });
            try {
                await TeamController.getTeamById(request, response);
            } catch (error) {
                expect(response.statusCode).toBe(404);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getTeamsByType', () => {

        test('should return team list by type', async () => {
            const teamsData = generateTeamsData(2);
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeamsByType")
                .mockResolvedValueOnce(teamsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/type/Local',
            });
            const teams = await TeamController.getTeamsByType(request, response);
            expect(teams).toEqual(teamsData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty array', async () => {
            const teamData = generateTeamsData(1)[0];
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeamsByType")
                .mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/type/' + teamData.Type,
            });
            const teams = await TeamController.getTeamsByType(request, response);
            expect(teams).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('createTeam', () => {

        test('should return status code 200', async () => {
            const teamsData = generateTeamsData(1);
            const spy = jest
                .spyOn(TeamRepository.prototype, "createTeam")
                .mockResolvedValueOnce(1);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/team',
                body: teamsData[0],
            });
            await TeamController.createTeam(request, response);
            expect(response.statusCode).toBe(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return status code 400', async () => {
            const teamsData = generateTeamsData(1);
            response = createResponse();
            request = createRequest({
                method: 'POST',
                url: 'api/v1/team',
                body: { Name: teamsData[0].Name },
            });
            await TeamController.createTeam(request, response);
            expect(response.statusCode).toBe(400);
        });
    });

    describe('getTeamsByTournamentCode', () => {

        test('should return a team list by tournament', async () => {
            const tournament = createRandomTournament();
            const teamsData = addTeamsToRandomTournament(tournament, 4);
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeamsByTournamentCode")
                .mockResolvedValueOnce(teamsData);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/tournament/' + tournament.CodeTournament,
            });
            const teams = await TeamController.getTeamsByTournamentCode(request, response);
            expect(teams).toEqual(teamsData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty list', async () => {
            const tournament = createRandomTournament();
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeamsByTournamentCode")
                .mockResolvedValueOnce([]);
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/tournament/' + tournament.CodeTournament,
            });
            const teams = await TeamController.getTeamsByTournamentCode(request, response);
            expect(teams).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
