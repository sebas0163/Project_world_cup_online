import TeamController from "../controllers/team.controller";
import { TeamRepository } from "../repositories/team.repository";
import { generateTeamsData } from "./utils/generate";
import { Request, Response } from "express";
import {
    createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';


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

        test('should return a team list by tournament', async () => {
            const teamsData = generateTeamsData(2);
            const spy = jest
                .spyOn(TeamRepository.prototype, "getTeamsByTournamentCode")
                .mockResolvedValueOnce(teamsData);
            const tournamentCode = "TR0001";
            response = createResponse();
            request = createRequest({
                method: 'GET',
                url: 'api/v1/team/tournament/' + tournamentCode,
            });
            const teams = await TeamController.getTeamsByTournamentCode(request, response);
            expect(teams).toEqual(teamsData);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
