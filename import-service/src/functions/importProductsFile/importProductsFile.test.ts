import * as AWSMock from 'aws-sdk-mock';
import * as mockContext from 'aws-lambda-mock-context';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { BUCKET, CsvFileFolder, HttpCode } from 'src/constants';
import { importProductsFile } from './handler';

import { s3 } from 'src/S3Service';

jest.mock('src/S3Service');

async function getSignedUrlPromiseMock(fileName: string) {
    return `https://import-service-products-files.com/${CsvFileFolder.Uploaded}/${fileName}?bucket=${BUCKET}`;
}

beforeEach(() => {
    s3.getSignedUrlPromise = jest.fn(getSignedUrlPromiseMock);
});

afterAll(done => {
    done();
    AWSMock.restore('S3');
    ctx.succeed('success');
});

const cb = () => null;
const ctx = mockContext.default({ timeout: 1 });

describe('importProductsFile', () => {
    it('should return 400 if no fileName is provided', async () => {
        const event: Pick<APIGatewayProxyEvent, 'queryStringParameters'> = {
            queryStringParameters: {},
        };
        const response = await importProductsFile(event as APIGatewayProxyEvent, ctx, cb);
        expect(response!.statusCode).toBe(HttpCode.BadRequest);
    });
    it('should create proper signed url', async () => {
        const fileName = 'test.csv';
        const expectedSignedUrl = `https://import-service-products-files.com/${CsvFileFolder.Uploaded}/${fileName}?bucket=${BUCKET}`;
        const event: Pick<APIGatewayProxyEvent, 'queryStringParameters'> = {
            queryStringParameters: { name: fileName },
        };

        const response = await importProductsFile(event as APIGatewayProxyEvent, ctx, cb);
        const resultSignedUrl = JSON.parse(response!.body).signedUrl;

        expect(resultSignedUrl).toBe(expectedSignedUrl);
        expect(response!.statusCode).toBe(HttpCode.Ok);
    });
});
