import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse, } from 'node-mocks-http';
import PredictionController from '../controllers/prediction.controller';
import { PredictionRepository } from '../repositories/prediction.repository';
import { generatePredictionsData, generateRandomPrediction } from './utils/generate';
import { Prediction } from '../models/prediction';

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
    });
});