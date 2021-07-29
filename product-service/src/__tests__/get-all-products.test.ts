import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as mockContext from 'aws-lambda-mock-context';

import { HttpCode } from 'src/constants';
import { IProduct, PRODUCT_BY_ID_MAP } from 'src/products-list';
import { getAllProducts } from '../functions/get-all-products/handler';

describe('Unit test for getAllProducts handler', () => {
    const ctx = mockContext.default();
    const cb = () => null;
    const event = {};

    it('should return array of products', async () => {
        const result = (await getAllProducts(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;
        const products: IProduct[] = JSON.parse(result.body).products;

        expect(result.statusCode).toEqual(HttpCode.Ok);
        expect(Array.isArray(products)).toEqual(true);
    });

    it('should return all available products', async () => {
        const result = (await getAllProducts(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;
        const products: IProduct[] = JSON.parse(result.body).products;

        expect(products.length).toEqual(PRODUCT_BY_ID_MAP.size);
        products.forEach(product => {
            expect(product).toMatchSnapshot({ ...PRODUCT_BY_ID_MAP.get(product.id) });
        });
    });
});
