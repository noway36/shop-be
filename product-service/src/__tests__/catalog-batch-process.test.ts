import * as mockContext from 'aws-lambda-mock-context';
import { SQSEvent } from 'aws-lambda';

import { HttpCode } from 'src/constants';
import { catalogBatchProcess } from '../functions/catalog-batch-process/handler';
import { IProduct } from 'src/products-list';
import { Publisher } from 'src/publisher';

import * as DA from 'src/libs/data-access';

const ctx = mockContext.default({ timeout: 1 });

jest.mock('src/publisher/sns');
jest.spyOn(DA, 'addProductData').mockImplementation(addProductDataMock);

async function publishProductMock() {}
async function addProductDataMock(product: Omit<IProduct, 'id'>) {
    return Promise.resolve({ ...product, id: 'some_id' });
}

beforeEach(() => {
    Publisher.publishProduct = jest.fn(publishProductMock);
});

describe('catalogBatchProcess', () => {
    it('should return proper inserted product', async () => {
        const sampleProduct: Omit<IProduct, 'id'> = {
            count: 7,
            description: 'Sample Product',
            price: 23,
            title: 'Sample Product',
        };
        const event = {
            Records: [
                {
                    body: JSON.stringify(sampleProduct),
                },
            ],
        };

        const response = await catalogBatchProcess(event as SQSEvent, ctx);
        const responseProduct = JSON.parse(response.body).products[0];

        expect(response!.statusCode).toBe(HttpCode.Ok);
        expect(responseProduct).toStrictEqual({ ...sampleProduct, id: 'some_id' });
    });

    it('should call sns publisher for each product', async () => {
        const sampleProducts: Omit<IProduct, 'id'>[] = [
            {
                count: 7,
                description: 'Sample Product',
                price: 23,
                title: 'Sample Product',
            },
            {
                count: 7,
                description: 'Sample Product1',
                price: 23,
                title: 'Sample Product1',
            },
        ];
        const event = {
            Records: sampleProducts.map(product => ({
                body: JSON.stringify(product),
            })),
        };

        await catalogBatchProcess(event as SQSEvent, ctx);

        expect(Publisher.publishProduct).toHaveBeenCalledTimes(2);
    });
});
