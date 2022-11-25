import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse, } from 'node-mocks-http';
import PredictionController from '../controllers/prediction.controller';
import { PredictionRepository } from '../repositories/prediction.repository';
import { createRandomUser, generatePredictionsData, generatePredictionsForUser, generateRandomPrediction } from './utils/generate';
import { Prediction } from '../models/prediction';
import { User } from '../models/user';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Prediction Controller', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    describe('getPredictions', () => {
        test('should return 200 and predictions', async () => {
            const predictions = generatePredictionsData(2);
            const spy = jest.spyOn(PredictionRepository.prototype, 'getPredictions').mockResolvedValue(predictions);
            req = createRequest();
            res = createResponse();
            const result = await PredictionController.getPredictions(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(predictions);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return empty list', async () => {
            const spy = jest.spyOn(PredictionRepository.prototype, 'getPredictions')
                .mockResolvedValue([]);
            req = createRequest();
            res = createResponse();
            const result = await PredictionController.getPredictions(req, res);
            expect(res.statusCode).toBe(200);
            expect(result).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getPredictionsByUser', () => {
        test('should return 200 and predictions', async () => {
            const user: User = createRandomUser();
            const predictions = generatePredictionsForUser(2, user)
            const spy = jest.spyOn(PredictionRepository.prototype, 'getPredictionsByUser')
                .mockResolvedValue(predictions);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/prediction/user/' + user.Id,
            });
            const result = await PredictionController.getPredictionsByUser(req, res);
            expect(result).toBe(predictions);
            expect(spy).toHaveBeenCalledTimes(1);

        });

        test('should return empty list', async () => {
            const user: User = createRandomUser();
            const spy = jest.spyOn(PredictionRepository.prototype, 'getPredictionsByUser')
                .mockResolvedValue([]);
            res = createResponse();
            req = createRequest({
                method: 'GET',
                url: 'api/v1/prediction/user/' + user.Id,
            });
            const result = await PredictionController.getPredictionsByUser(req, res);
            expect(result).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);

        });
    });

    describe('createPrediction', () => {
        test('should return 200', async () => {
            const prediction = generateRandomPrediction();
            const spy = jest.spyOn(PredictionRepository.prototype, 'createPrediction')
                .mockResolvedValueOnce(prediction.Id);
            //console.log(prediction);
            req = createRequest({
                body: prediction
            });
            res = createResponse();
            await PredictionController.createPrediction(req, res);
            expect(res.statusCode).toBe(200);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return 400', async () => {
            const prediction = generateRandomPrediction();
            const spy = jest.spyOn(PredictionRepository.prototype, 'createPrediction')
                .mockRejectedValueOnce(prediction);
            req = createRequest({
                body: prediction
            });
            res = createResponse();
            try {
                await PredictionController.createPrediction(req, res);

            } catch (error) {
                expect(res.statusCode).toBe(400);
            }

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});