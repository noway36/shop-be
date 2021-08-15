import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { ErrorResponse, formatJSONResponse, logRequestData } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAllProductsData } from '@libs/data-access';

import { HttpCode } from 'src/constants';
import { IProduct } from 'src/products-list';

export const getAllProducts: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    logRequestData(event, 'get-all-products');

    try {
        const products: IProduct[] = await getAllProductsData();

        return formatJSONResponse({
            products,
        });
    } catch (error) {
        return new ErrorResponse(`Failed to get products list: ${error}`, HttpCode.InternalServerError);
    }
};

export const main = middyfy(getAllProducts);
