import { Response, Request } from 'express';
import { createResponse, createRequest, MockRequest, MockResponse } from 'node-mocks-http';
import { createRandomAdmin } from './utils/generate';
import { AdminRepository } from '../repositories/admin.repository';
import AdminController from '../controllers/admin.controller';

afterEach(() => {
    jest.clearAllMocks();
});

describe('AdminController', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;

    describe('loginUser', () => {
        test('should login a user', async () => {
            const admin = createRandomAdmin();
            const spy = jest.spyOn(AdminRepository.prototype, 'login').mockResolvedValue(admin);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/admin/login',
                body: admin,
            });
            await AdminController.login(req, res);
            expect(res.statusCode).toEqual(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return missing parameters(400)', async () => {
            const admin = createRandomAdmin();
            const spy = jest.spyOn(AdminRepository.prototype, 'login').mockResolvedValue(admin);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/admin/login',
                body: {
                    Email: admin.Email,
                },
            });
            try {
                await AdminController.login(req, res);
            } catch (error) {
                expect(res.statusCode).toEqual(400);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return invalid credentials', async () => {
            const wrongAdmin = createRandomAdmin();
            const spy = jest.spyOn(AdminRepository.prototype, 'login').mockRejectedValueOnce(wrongAdmin);
            res = createResponse();
            req = createRequest({
                method: 'POST',
                url: 'api/v1/admin/login',
                body: wrongAdmin,
            });
            try {
                await AdminController.login(req, res);
            } catch (error) {
                expect(res.statusCode).toEqual(500);
            }
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
