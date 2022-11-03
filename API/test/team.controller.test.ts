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
    });
});
