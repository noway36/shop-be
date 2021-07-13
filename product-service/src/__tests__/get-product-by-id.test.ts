import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as mockContext from 'aws-lambda-mock-context';

import { HttpCode } from 'src/constants';
import { getProductById } from '../functions/get-product-by-id/handler';

describe('Unit test for getProductById handler', function () {
    const ctx = mockContext.default();
    const cb = () => null;

    it('should find proper product by id', async () => {
        const event: Pick<APIGatewayProxyEvent, 'pathParameters'> = {
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
            },
        };
        const result = (await getProductById(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;
        const body = JSON.parse(result.body);

        expect(result.statusCode).toEqual(HttpCode.Ok);
        expect(body.product.title).toEqual('Nice Product 1');
    });

    it('should return not found if there is no such product', async () => {
        const event: Pick<APIGatewayProxyEvent, 'pathParameters'> = {
            pathParameters: {
                productId: 'some-id',
            },
        };
        const result = (await getProductById(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;

        expect(result.statusCode).toEqual(HttpCode.NotFound);
    });
});
