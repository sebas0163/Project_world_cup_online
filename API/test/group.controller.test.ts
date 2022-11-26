import { Response, Request } from 'express';
import { createResponse, createRequest, MockRequest, MockResponse } from 'node-mocks-http';
import { GroupRepository } from '../repositories/group.repository';
import GroupController from '../controllers/group.controller';
import { createRandomUser, generateGroupsData } from './utils/generate';

afterEach(() => {
    jest.clearAllMocks();
});

describe('GroupController', () => {

    let req: MockRequest<Request>;
    let res: MockResponse<Response>;

    describe('getGroups', () => {
        test('should get all groups', async () => {
            const groups = generateGroupsData(3);
            const spy = jest.spyOn(GroupRepository.prototype, 'getGroups').mockResolvedValue(groups);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/group',
            });
            await GroupController.getGroups(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty list', async () => {

            const spy = jest.spyOn(GroupRepository.prototype, 'getGroups').mockResolvedValue([]);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/group',
            });
            await GroupController.getGroups(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getGroup', () => {
        test('should get a group', async () => {
            const group = generateGroupsData(1)[0];
            const spy = jest.spyOn(GroupRepository.prototype, 'getGroup').mockResolvedValue(group);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/group/' + group.Code,
            });
            await GroupController.getGroup(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return not found', async () => {
            const missingGroup = generateGroupsData(1)[0];
            const spy = jest.spyOn(GroupRepository.prototype, 'getGroup').mockRejectedValue(missingGroup);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/group/' + missingGroup.Code,
            });
            try {
                await GroupController.getGroup(req, res);
            } catch (error) {
                expect(res.statusCode).toEqual(404);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('createGroup', () => {
        test('should create a group', async () => {
            const group = generateGroupsData(1)[0];
            const spy = jest.spyOn(GroupRepository.prototype, 'createGroup').mockResolvedValue(group.Code);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/group',
                body: group,
            });
            await GroupController.createGroup(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return bad request', async () => {
            const group = generateGroupsData(1)[0];
            const spy = jest.spyOn(GroupRepository.prototype, 'createGroup').mockRejectedValue(group);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/group',
                body: group,
            });
            try {
                await GroupController.createGroup(req, res);
            } catch (error) {
                expect(res.statusCode).toEqual(400);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('joinGroup', () => {
        test('should join a group', async () => {
            const group = generateGroupsData(1)[0];
            const user = createRandomUser();
            const body = {
                Group_code: group.Code,
                User_ID: user.Id
            }
            const spy = jest.spyOn(GroupRepository.prototype, 'joinGroup').mockResolvedValue(1);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/group/join',
                body: body,
            });
            await GroupController.joinGroup(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return bad request', async () => {
            const group = generateGroupsData(1)[0];
            //const user = createRandomUser();
            const spy = jest.spyOn(GroupRepository.prototype, 'joinGroup').mockRejectedValue(group);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/group/join',
                body: {
                    Group_code: group.Code,
                }
            });
            try {
                await GroupController.joinGroup(req, res);
            } catch (error) {
                expect(res.statusCode).toEqual(400);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});