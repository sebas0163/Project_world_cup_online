import { Response, Request } from 'express';
import { createResponse, createRequest, MockRequest, MockResponse } from 'node-mocks-http';
import UserController from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';
import { generateUsersData } from './utils/generate';

afterEach(() => {
    jest.clearAllMocks();
});

describe('UserController', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    describe('getUsers', () => {
        test('should return a list of users', async () => {
            const usersData: User[] = generateUsersData(3);
            const spy = jest.spyOn(UserRepository.prototype, 'getUsers').mockResolvedValue(usersData);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/user',
            });
            const users = await UserController.getUsers(req, res);
            expect(users).toEqual(usersData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return an empty list of users', async () => {
            const spy = jest.spyOn(UserRepository.prototype, 'getUsers').mockResolvedValue([]);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/user',
            });
            const users = await UserController.getUsers(req, res);
            expect(users).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return a user', async () => {
            const usersData: User[] = generateUsersData(1);
            const spy = jest.spyOn(UserRepository.prototype, 'getUserById').mockResolvedValue(usersData[0]);
            const userId = usersData[0].Id;
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/user/' + userId,
                params: {
                    userId: userId,
                },
            });
            const user = await UserController.getUserById(req, res);
            expect(user).toEqual(usersData[0]);
            expect(spy).toHaveBeenCalledTimes(1);
        }
        );
    });

    describe('createUser', () => {
        test('should create a user', async () => {
            const usersData: User[] = generateUsersData(1);
            const spy = jest.spyOn(UserRepository.prototype, 'createUser').mockResolvedValue(1);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/user',
                body: usersData[0],
            });
            await UserController.createUser(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('loginUser', () => {
        test('should login a user', async () => {
            const usersData: User[] = generateUsersData(1);
            const spy = jest.spyOn(UserRepository.prototype, 'login').mockResolvedValue(usersData[0]);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/user/login',
                body: {
                    Email: usersData[0].Email,
                    Password: usersData[0].Password
                },
            });
            await UserController.login(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

});