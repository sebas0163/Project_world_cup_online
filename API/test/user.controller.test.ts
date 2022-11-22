import { Response, Request } from 'express';
import { createResponse, createRequest, MockRequest, MockResponse } from 'node-mocks-http';
import UserController from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';
import { createWrongPassword, generateUsersData } from './utils/generate';

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

    describe('getUserById', () => {
        test('should return a user', async () => {
            const user: User = generateUsersData(1)[0];
            const spy = jest.spyOn(UserRepository.prototype, 'getUserById')
                .mockResolvedValueOnce(user);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/user/' + user.Id,
                params: {
                    userId: user.Id,
                },
            });
            const result = await UserController.getUserById(req, res);
            expect(result).toEqual(user);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 404', async () => {
            const missingUser: User = generateUsersData(1)[0];
            const spy = jest.spyOn(UserRepository.prototype, 'getUserById')
                .mockRejectedValueOnce(missingUser);
            // console.log(missingUser);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/user/' + missingUser.Id,
            });
            try {
                await UserController.getUserById(req, res);
            } catch (error) {
                console.log(error);
                expect(res.statusCode).toEqual(404);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });
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

        test('should return missing parameters(400)', async () => {
            const usersData: User[] = generateUsersData(1);
            const spy = jest.spyOn(UserRepository.prototype, 'createUser').mockResolvedValue(1);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/user',
                body: {
                    Name: usersData[0].Name,
                },
            });
            await UserController.createUser(req, res);
            expect(res.statusCode).toEqual(400);
            expect(spy).toHaveBeenCalledTimes(0);
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

        test('should return missing parameters(400)', async () => {
            const usersData: User[] = generateUsersData(1);
            const spy = jest.spyOn(UserRepository.prototype, 'login').mockResolvedValue(usersData[0]);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/user/login',
                body: {
                    Email: usersData[0].Email,
                },
            });
            await UserController.login(req, res);
            expect(res.statusCode).toEqual(400);
            expect(spy).toHaveBeenCalledTimes(0);
        });

        test('should return invalid credentials', async () => {
            const wrongUser = generateUsersData(1)[0];
            const spy = jest.spyOn(UserRepository.prototype, 'login').mockRejectedValueOnce(wrongUser);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/user/login',
                body: {
                    Email: wrongUser.Email,
                    Password: wrongUser.Password
                },
            });
            await UserController.login(req, res);
            expect(res.statusCode).toEqual(500);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

});