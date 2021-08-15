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
                productId: '9a14812c-07e1-463e-9fa1-1a5179f48e61',
            },
        };
        const result = (await getProductById(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;
        const body = JSON.parse(result.body);
        console.log(body);

        expect(result.statusCode).toEqual(HttpCode.Ok);
        expect(body.product.title).toEqual('Nice Product 1');
        expect(body.product.count).toEqual(4);
    });

    it('should return not found if there is no such product', async () => {
        const event: Pick<APIGatewayProxyEvent, 'pathParameters'> = {
            pathParameters: {
                productId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            },
        };
        const result = (await getProductById(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;

        expect(result.statusCode).toEqual(HttpCode.NotFound);
    });
});
